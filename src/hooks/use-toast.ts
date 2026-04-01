import { ReactNode, Dispatch, createContext, useReducer, useContext } from "react";

export type Toast = {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  open: boolean;
};

type State = {
  toasts: Toast[];
};

type Action =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

type ToastContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const TOAST_LIMIT = 3;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case "DISMISS_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          action.toastId === undefined || toast.id === action.toastId
            ? { ...toast, open: false }
            : toast
        ),
      };
    case "REMOVE_TOAST":
      if (action.toastId === undefined) return { ...state, toasts: [] };
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.toastId),
      };
    default:
      return state;
  }
}

// Provider logic (non-UI)
export function createToastStore() {
  const [state, dispatch] = useReducer(reducer, { toasts: [] });

  function show(toast: Omit<Toast, "id" | "open">) {
    const id = genId();
    dispatch({ type: "ADD_TOAST", toast: { ...toast, id, open: true } });
    return id;
  }

  function dismiss(toastId?: string) {
    dispatch({ type: "DISMISS_TOAST", toastId });
  }

  function remove(toastId?: string) {
    dispatch({ type: "REMOVE_TOAST", toastId });
  }

  return { state, show, dismiss, remove, dispatch };
}

// Hook version
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be inside ToastProvider");

  const { dispatch, state } = context;

  function show(toast: Omit<Toast, "id" | "open">) {
    const id = genId();
    dispatch({ type: "ADD_TOAST", toast: { ...toast, id, open: true } });
    return id;
  }

  function dismiss(toastId?: string) {
    dispatch({ type: "DISMISS_TOAST", toastId });
  }

  function remove(toastId?: string) {
    dispatch({ type: "REMOVE_TOAST", toastId });
  }

  return { state, show, dismiss, remove };
}

export { ToastContext };
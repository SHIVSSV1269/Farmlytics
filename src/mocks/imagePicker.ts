/**
 * Web mock for react-native-image-picker
 * Uses browser's native <input type="file"> API
 */

export interface Asset {
  uri?: string;
  base64?: string;
  fileName?: string;
  type?: string;
  width?: number;
  height?: number;
}

export interface ImagePickerResponse {
  didCancel?: boolean;
  errorMessage?: string;
  assets?: Asset[];
}

export const launchImageLibrary = (
  _options: any,
  callback: (response: ImagePickerResponse) => void
): void => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) {
      callback({ didCancel: true });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Strip the data:image/jpeg;base64, prefix to get raw base64
      const base64 = dataUrl.split(',')[1];
      callback({
        assets: [{
          uri: dataUrl,
          base64,
          fileName: file.name,
          type: file.type,
        }],
      });
    };
    reader.readAsDataURL(file);
  };

  input.oncancel = () => callback({ didCancel: true });
  input.click();
};

export const launchCamera = (
  _options: any,
  callback: (response: ImagePickerResponse) => void
): void => {
  // Browsers don't have a separate "camera" API without getUserMedia
  // Fall back to file picker with capture attribute
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.setAttribute('capture', 'environment');

  input.onchange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) { callback({ didCancel: true }); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      callback({ assets: [{ uri: dataUrl, base64, fileName: file.name, type: file.type }] });
    };
    reader.readAsDataURL(file);
  };

  input.click();
};

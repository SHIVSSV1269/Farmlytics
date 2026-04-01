import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Index = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Redirect to the "Welcome" screen
    navigation.replace("WelcomeScreen"); 
    // use `replace` so user cannot go back to this screen
  }, [navigation]);

  return null; // nothing to render
};

export default Index;


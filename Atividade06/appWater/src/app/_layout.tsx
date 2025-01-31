import { router, Slot } from "expo-router";
import {ClerkProvider, useAuth} from '@clerk/clerk-expo'
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

function InitialLayout(){

  const{isSignedIn, isLoaded} = useAuth()

  useEffect(() => {
    if(!isLoaded) return 

    if(isSignedIn){ 
      router.replace("/(auth)" as any)
    } else {
      router.replace("/(public)" as any) 
    }
  },[isSignedIn])

  return isLoaded ? <Slot/> : ( 
    <ActivityIndicator
      style={{flex: 1, justifyContent: "center", alignItems: "center"}}
    />
  )
}

export default function Layout() {
  return (

    <ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <InitialLayout/>
    </ClerkProvider>
  );
}
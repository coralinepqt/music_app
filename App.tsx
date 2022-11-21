import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SearchView from "./src/components/SearchView";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react/cjs/react.development";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResultView from "./src/components/ResultView";
import Favorites from "./src/components/Favorites";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  const [libraryList, setLibraryList] = useState([]);

  const addItem = (item) => {
    setLibraryList((prev) => [...prev, item]);
  };
  return (
    <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Favorites":
                iconName = focused ? "heart" : "heart-outline";
                break;
              case "Search":
                iconName = focused ? "home" : "home-outline";
            }
            return <Ionicons name={iconName} size={size} color={color}  />
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabs.Screen name="Search">
          {(props) => <SearchView {...props} onAdd={addItem} />}
        </Tabs.Screen>
        <Tabs.Screen name="Favorites">
          {(props)=><Favorites {...props} libraryList={libraryList} />}
        </Tabs.Screen> 
      </Tabs.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Result" component={ResultView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

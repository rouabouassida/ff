import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LanguageProvider } from "./app/Screens/LanguageContext"; // Importez le fournisseur de langue

import AccountScreen from "./app/Screens/AccountScreen";
import PointageUser from "./app/Screens/PointageUser";
import FonctionaliterUser from "./app/Screens/FonctionalierUser";
import DispoRemote from "./app/Screens/DispoRemote";
import DispoPresentiel from "./app/Screens/DispoPresentiel";
import DispoConge from "./app/Screens/DispoCongé";
import CongeEnvoyer from "./app/Screens/CongéEnvoyer";
import DemandeRemote from "./app/Screens/DemandeRemote";
import DemandeEnvoyer from "./app/Screens/DemandeEnvoyer";
import Consulterdisposition from "./app/Screens/Consulterdisposition";
import PremierInterface from "./app/Screens/PremierInterface";
import DemandeConge from "./app/Screens/DemandeConge";
import Conge from "./app/Screens/Congé";
import ModifierConge from "./app/Screens/ModifierCongé";
import SupprimerConge from "./app/Screens/SupprimerCongé";
import Chrono from "./app/Screens/Chrono";
import PresentielEmployees from "./app/Screens/PresentielEmployees";
import RemoteEmployees from "./app/Screens/RemoteEmployees";
import Login from "./app/Screens/Login"; // Importez l'interface de connexion
import LoginRh from "./app/Screens/LoginRh";
import GererEmployer from "./app/Screens/GererEmployer";
import PointerRH from "./app/Screens/PointerRH";
import EmployeeHistory from "./app/Screens/EmployeeHistory";
import AjouterRh from "./app/Screens/AjouterRh";
import VacationManagement from "./app/Screens/VacationManagement";
import SuivieEmployer from "./app/Screens/SuivieEmployer";
import AjouterEmployer from "./app/Screens/AjouterEmployer";
import ModifierEmployer from "./app/Screens/ModifierEmployer";
import Supprimer from "./app/Screens/Supprimer";
import PointerUser from "./app/Screens/PointerUser";
import CongeEmployee from "./app/Screens/CongeEmployee";
import Congé from "./app/Screens/Congé";
import ModifierCongé from "./app/Screens/ModifierCongé";
import SupprimerCongé from "./app/Screens/SupprimerCongé";
import EditPassword from "./app/Screens/EditPassword";
import EditName from "./app/Screens/EditName";
import Splash from "./app/Screens/Splash";
import ForgetPassword from "./app/Screens/ForgetPassword";
import Confirmation from "./app/Screens/Confirmation";
import Seetings from "./app/Screens/Seetings";
import EditNameRH from "./app/Screens/EditNameRH";
import EditPasswordRH from "./app/Screens/EditPasswordRH";
import SupprimerRH from "./app/Screens/SupprimerRH";
import ModifierLanguage from "./app/Screens/ModifierLanguage";
import GererRemote from "./app/Screens/GererRemote"


const Stack = createStackNavigator();

const App = () => {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="GererRemote"
            component={GererRemote}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={PremierInterface}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginRh"
            component={LoginRh}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="PointerRH"
            component={PointerRH}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EmployeeHistory"
            component={EmployeeHistory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VacationManagement"
            component={VacationManagement}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AjouterRh"
            component={AjouterRh}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GererEmployer"
            component={GererEmployer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SuivieEmployer"
            component={SuivieEmployer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AjouterEmployer"
            component={AjouterEmployer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ModifierEmployer"
            component={ModifierEmployer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Supprimer"
            component={Supprimer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PointerUser"
            component={PointerUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FonctionaliterUser"
            component={FonctionaliterUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PointageUser"
            component={PointageUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chrono"
            component={Chrono}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Congé"
            component={Congé}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DemandeConge"
            component={DemandeConge}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ModifierCongé"
            component={ModifierCongé}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SupprimerCongé"
            component={SupprimerCongé}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DemandeRemote"
            component={DemandeRemote}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DispositionUser"
            component={Consulterdisposition}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PresentielEmployees"
            component={PresentielEmployees}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RemoteEmployees"
            component={RemoteEmployees}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CongeEmployee"
            component={CongeEmployee}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="CongeEnvoyer"
            component={CongeEnvoyer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DemandeEnvoyer"
            component={DemandeEnvoyer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DispoConge"
            component={DispoConge}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DispoPresentiel"
            component={DispoPresentiel}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DispoRemote"
            component={DispoRemote}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={AccountScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Seetings"
            component={Seetings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ModifierLanguage"
            component={ModifierLanguage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SupprimerRH"
            component={SupprimerRH}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Confirmation"
            component={Confirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditName"
            component={EditName}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditPassword"
            component={EditPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditNameRH"
            component={EditNameRH}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditPasswordRH"
            component={EditPasswordRH}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GererConge"
            component={Conge}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ModifierConge"
            component={ModifierConge}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SupprimerConge"
            component={SupprimerConge}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
};

export default App;

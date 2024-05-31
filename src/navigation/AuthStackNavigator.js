import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../main/dashboard/Dashboard';
import Profile from '../main/profile/Profile';
import Leave from '../main/leave/Leave';
import Expanses from '../main/expenses/Expanses';
import DoctorList from '../main/doctross add/DoctorList'
import Doctor from '../main/doctross add/Doctor';
import AddDoctorsForm from '../main/doctross add/AddDoctorsForm';
import FollowUp from '../main/followup/FollowUp';
import FollowupList from '../main/followup/FollowupList';
import ExpenseAdd from '../main/expenses/ExpenseAdd';
import TodayVisit from '../main/dashboard/TodayVisit';
import ExpenseView from '../main/expenses/ExpenseView';
import Hospitals from '../main/doctross add/Hospitals';
import Rbm from '../main/new/Rbm';
import Abm from '../main/new/Abm';
import Sme from '../main/new/Sme';
import DoctorLists from '../main/new/DoctorLists';

const AuthStackNavigator = () => {

    const AuthStack = createNativeStackNavigator();

    return (
        <AuthStack.Navigator initialRouteName="Dashboard" screenOptions={{
            headerShown: false
        }}>
            <AuthStack.Screen name="Dashboard" component={Dashboard} />
            <AuthStack.Screen name="DoctorList" component={DoctorList} />
            <AuthStack.Screen name="Profile" component={Profile} />
            <AuthStack.Screen name="Leave" component={Leave} />
            <AuthStack.Screen name="Expanses" component={Expanses} />
            <AuthStack.Screen name="Doctor" component={Doctor} />
            <AuthStack.Screen name="AddDoctorsForm" component={AddDoctorsForm} />
            <AuthStack.Screen name="FollowUp" component={FollowUp} />
            <AuthStack.Screen name="FollowupList" component={FollowupList} />
            <AuthStack.Screen name="ExpenseAdd" component={ExpenseAdd} />
            <AuthStack.Screen name="TodayVisit" component={TodayVisit} />
            <AuthStack.Screen name="ExpenseView" component={ExpenseView} />
            <AuthStack.Screen name="Hospitals" component={Hospitals} />
            <AuthStack.Screen name="Rbm" component={Rbm} />
            <AuthStack.Screen name="Abm" component={Abm} />
            <AuthStack.Screen name="Sme" component={Sme} />
            <AuthStack.Screen name="DoctorLists" component={DoctorLists} />
        </AuthStack.Navigator>
    );
};

export default AuthStackNavigator;
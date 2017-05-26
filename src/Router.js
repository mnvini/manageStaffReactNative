import React from 'react'
import { Button } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'
import LoginForm from './components/LoginForm'
import EmployeeList from './components/EmployeeList'
import EmployeeCreate from './components/EmplyeeCreate'
import EmployeeEdit from './components/EmployeeEdit'

export const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'EmployeeList' })
  ]
})

export const Tabs = StackNavigator({
  LoginForm: {
    screen: LoginForm,
    navigationOptions: {
      headerTitle: 'Please Login',
      headerStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        elevation: 10,
        position: 'relative',
      }
    }
  },

  EmployeeList: {
    screen: EmployeeList,
    navigationOptions: ({ navigation }) => ({
      title: 'Employee',
      headerLeft: null,
      headerRight: <Button title="Add" onPress={() => navigation.navigate('EmployeeCreate')} />,
      headerStyle: {
        paddingRight: 15

      }
    })
  },

  EmployeeCreate: {
    screen: EmployeeCreate,
    navigationOptions: {
      title: 'Create Employee'
    }
  },

  EmployeeEdit: {
    screen: EmployeeEdit,
    navigationOptions: {
      title: 'Edit Employee'
    }
  },
}, {
    initialRouteName: 'LoginForm',
    mode: 'card'
  })

// const defaultGetStateForAction = Tabs.router.getStateForAction;

// Tabs.router.getStateForAction = (action, state) => {
//   if (action.type === NavigationActions.BACK &&
//     state && state.routes[state.index].routeName === 'LoginForm') {
//     return null;
//   }
//   if (action.type === NavigationActions.BACK && state) {
//     const newRoutes = state.routes.filter(r => r.routeName !== 'LoginForm');
//     const newIndex = newRoutes.length - 1;
//     return defaultGetStateForAction(action, { index: newIndex, routes: newRoutes });
//   }
//   return defaultGetStateForAction(action, state);
// };


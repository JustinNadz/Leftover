import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  WelcomeScreen,
  PhoneAuthScreen,
  BuyerHomeScreen,
  ProductDetailScreen,
  CheckoutScreen,
  MerchantDashboardScreen,
  PostListingScreen,
  OrderDetailScreen,
  BuyerOrdersScreen,
  ProfileScreen,
  PaymentMethodsScreen,
  AddPaymentMethodScreen,
  RateOrderScreen,
  MerchantRegistrationScreen,
  CustomerReviewsScreen,
  PerformanceScreen,
  InventoryScreen,
  OrderTrackingScreen,
  DietaryPreferencesScreen,
  ExploreScreen,
  HomeDiscoverScreen,
  SavedFavoritesScreen,
  SupportChatScreen,
  MyRewardsScreen,
  RewardRedemptionScreen,
  ConfirmRedemptionScreen,
  PartnerRegistrationScreen,
  SupportBotScreen,
  ManagePaymentScreen,
  LiveDeliveryScreen,
  BulkUploadScreen,
  ScheduledListingsScreen,
  HelpCenterScreen,
  PriceOptimizerScreen,
} from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
            <Stack.Screen name="BuyerHome" component={BuyerHomeScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="MerchantDashboard" component={MerchantDashboardScreen} />
            <Stack.Screen name="PostListing" component={PostListingScreen} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            <Stack.Screen name="BuyerOrders" component={BuyerOrdersScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
            <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
            <Stack.Screen name="RateOrder" component={RateOrderScreen} />
            <Stack.Screen name="MerchantRegistration" component={MerchantRegistrationScreen} />
            <Stack.Screen name="CustomerReviews" component={CustomerReviewsScreen} />
            <Stack.Screen name="Performance" component={PerformanceScreen} />
            <Stack.Screen name="Inventory" component={InventoryScreen} />
            <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
            <Stack.Screen name="DietaryPreferences" component={DietaryPreferencesScreen} />
            <Stack.Screen name="Explore" component={ExploreScreen} />
            <Stack.Screen name="HomeDiscover" component={HomeDiscoverScreen} />
            <Stack.Screen name="SavedFavorites" component={SavedFavoritesScreen} />
            <Stack.Screen name="SupportChat" component={SupportChatScreen} />
            <Stack.Screen name="MyRewards" component={MyRewardsScreen} />
            <Stack.Screen name="RewardRedemption" component={RewardRedemptionScreen} />
            <Stack.Screen name="ConfirmRedemption" component={ConfirmRedemptionScreen} />
            <Stack.Screen name="PartnerRegistration" component={PartnerRegistrationScreen} />
            <Stack.Screen name="SupportBot" component={SupportBotScreen} />
            <Stack.Screen name="ManagePayment" component={ManagePaymentScreen} />
            <Stack.Screen name="LiveDelivery" component={LiveDeliveryScreen} />
            <Stack.Screen name="BulkUpload" component={BulkUploadScreen} />
            <Stack.Screen name="ScheduledListings" component={ScheduledListingsScreen} />
            <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
            <Stack.Screen name="PriceOptimizer" component={PriceOptimizerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

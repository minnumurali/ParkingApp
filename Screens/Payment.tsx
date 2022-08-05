// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { useState } from 'react';




//   const [startTime, setStartTime] = useState<number>(0);
//   const [hrs, setHrs] = useState<number>(0);
//   const [amount, setAmount] = useState<number>(0);

// const Payment = () => {
//   return (
//     <View style={styles.modal}>
//     <Text style={styles.paymentHeader}>
//       Payment of Slot {currentSlot}
//     </Text>
//     <Text style={styles.rawText}>Time:{'\n'} {hrs} mins</Text>
//     <Text style={styles.rawText}>Total Amount:{amount}</Text>

//     <View style={styles.buttonRow}>
//       <Button 
//        style={styles.button}
//        theme={{ colors: { primary: '#FFFFFF'}}}
//         onPress={() => {
//           const flag = false;
//           axios
//             .post("https://httpstat.us/200", {
//               car_registration: regid,
//               charge: amount,
//             })
//             .then((res: any) => {});
//           setSlots(
//             slots.map((lot) => {
//               return lot.id === currentSlot
//                 ? {
//                     ...lot,
//                     free: true,
//                     reg: "",
//                     start: new Date(0, 0, 0),
//                   }
//                 : lot;
//             })
//           );
//           setAmount(0);
//           setHrs(0);
//           setShowRemoveModal(false);
//         }}>Remove</Button>
     
//       {/* <Button 
//        style={styles.button}
//        theme={{ colors: { primary: '#FFFFFF'}}}
//         onPress={() => {
//           setAmnt(0);
//           setHrs(0);
//           setShowRemoveModal(false);
//         }}>Cancel</Button> */}
      
//     </View>
//   </View>
//   )
// }

// export default Payment

// const styles = StyleSheet.create({})
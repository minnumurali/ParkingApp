import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { Snackbar,Button } from "react-native-paper";
import { lotsPropsType } from '../types/types';




const Lots: FC<lotsPropsType> = (props) => {

  const [slots, setSlots] = useState<any[]>([]);
  const [currentSlot, setCurrentSlot] = useState<number>(0);
  const [freeSlots, setFreeSlots] = useState<any[]>(slots);
  const [reg, setReg] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [showSnack, setShowSnack] = useState<boolean>(false);
  const [regid, setRegid] = useState<any>();

  const [startTime, setStartTime] = useState<number>(0);
  const [hrs, setHrs] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    drawLots();
  }, []);

  useEffect(() => {
    setFreeSlots(slots.filter((lot) => lot.free));
  }, [slots]);

  const drawLots = () => {
    let slotsArray = [];
    for (let i = 1; i <= props.route.params.lots; i++) {
      slotsArray.push({
        id: i,
        reg: "",
        free: true,
        start: new Date(0, 0, 0),
      });
    }
    setSlots(slotsArray);
  };

  const getRandomSlots = () => {
    const randomNum = Math.floor(Math.random() * freeSlots.length);
    setCurrentSlot(freeSlots[randomNum].id);
  };

  const handleAdd = (random: boolean) => {
    setReg("");
    if (freeSlots.length > 0) {
      startCount();
      if (random) {
        getRandomSlots();
      }
      if (currentSlot >= 0) {
        setShowAddModal(true);
      }
    } else {
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 3000);
    }
  };

  const handleRemove = (reg: any) => {
    !slots[currentSlot].free && setShowRemoveModal(true);
    setRegid(reg);
  };

  const startCount = () => {
    const start = new Date().getSeconds();
    setStartTime(start);
  };

  const calculateHrsAmt = () => {
    

    const end = new Date().getSeconds();
    const totalTime = (startTime - end) / (60 * 60);
    if (totalTime / 60 <= 2) {
      setAmount(10);
      setHrs(totalTime);
    } else {
      setAmount(10 + (totalTime - 2) * 10);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.getSlot} onPress={() => handleAdd(true)}>
        <Text style={styles.getSlotText}>Get Parking Slot</Text>
        </TouchableOpacity>
        <Snackbar
          visible={showSnack}
          onDismiss={() => setShowSnack(false)}
          style={styles.snack}
        >
          <Text style={styles.snackText}>Parking is full</Text>
        </Snackbar>
        <Modal 
        visible={showAddModal} 
        animationType="slide">
          <View style={styles.modal}>
            <Text style={styles.info}>Parking Slot {currentSlot}</Text>
            <TextInput
              placeholder="Enter vechile number"
              placeholderTextColor="grey"
              onChangeText={(text) => {
                setReg(text);
              }}
              style={styles.input}
            />

            <View style={styles.buttonRow}>
              <Button
              theme={{ colors: { primary: '#FFFFFF'}}}
                style={styles.button}
                disabled={reg.length === 0}
                onPress={() => {
                  if (reg.length) {
                    setSlots(
                      slots.map((lot) => {
                        return lot.id === currentSlot
                          ? {
                              ...lot,
                              free: false,
                              reg: reg,
                              start: new Date(),
                            }
                          : lot;
                      })
                    );
                    setShowAddModal(false);
                  }
                }}>Add</Button>
              
              <Button
                 style={styles.button}
                 theme={{ colors: { primary: '#FFFFFF'}}}
                onPress={() => {
                  setShowAddModal(false);
                }}>Cancel</Button>
            </View>
          </View>
        </Modal>
        <Modal
          visible={showRemoveModal}
          onShow={() => {
            calculateHrsAmt();
          }}
          animationType="slide"
        >
          <View style={styles.modal}>
            <Text style={styles.paymentHeader}>
              Payment of Slot {currentSlot}
            </Text>
            <Text style={styles.rawText}>Time:{'\n'} {hrs} mins</Text>
            <Text style={styles.rawText}>Total Amount:{amount}</Text>

            <View style={styles.buttonRow}>
              <Button 
               style={styles.button}
               theme={{ colors: { primary: '#FFFFFF'}}}
                onPress={() => {
                  const flag = false;
                  axios
                    .post("https://httpstat.us/200", {
                      car_registration: regid,
                      charge: amount,
                    })
                    .then((res: any) => {});
                  setSlots(
                    slots.map((lot) => {
                      return lot.id === currentSlot
                        ? {
                            ...lot,
                            free: true,
                            reg: "",
                            start: new Date(0, 0, 0),
                          }
                        : lot;
                    })
                  );
                  setAmount(0);
                  setHrs(0);
                  setShowRemoveModal(false);
                }}>Remove</Button>
             
               <Button 
               style={styles.button}
               theme={{ colors: { primary: '#FFFFFF'}}}
                onPress={() => {
                  setShowRemoveModal(false);
                }}>Cancel</Button> 
            
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.slots}>

          <FlatList
            data={slots}
            horizontal={false}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setCurrentSlot(item.id);
                  !item.free && handleRemove(item.reg),
                    !item.free && setShowRemoveModal(true);
                }}
              >
               
                <View
                  style={{
                    backgroundColor: item.free ? "#38b000" : "#d00000",
                    borderRadius: 5,
                    padding: 5,
                    width: 80,
                    height: 170,
                    margin: 14,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  
                  <Text style={styles.itemText}>P{item.id}</Text>
                  <Text style={styles.itemText}>
                    {item.free ? "Free" : `Occupied${item.reg}`}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Lots;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
      },
      getSlot: {
        padding: 15,
        backgroundColor: "#0000ff",
        borderRadius: 25,
        alignItems: "center",
        width: 300,
        marginLeft:35
      },
      getSlotText: {
        color: "white",
        fontWeight: "500",
        fontSize: 18,
      },
      snack: {
        bottom: 5,
        backgroundColor: "gray",
        padding: 50,
       
      },
      snackText: {
        color: "#f8f8ff",
        fontSize: 25
      },
      modal: {
        justifyContent: 'center',  
        alignItems: 'center',   
        backgroundColor : "#dcdcdc",   
        height: 400 ,  
        width: '80%',  
        borderRadius:10,  
        borderWidth: 1,  
        borderColor: '#fff',    
        marginTop: 80,  
        marginLeft: 40,  
   
   
      },
      info: {
        fontSize: 18,
        color: "black",
        fontWeight: "500",
        marginBottom: 10,
      },
      input: {
        padding: 5,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
        height: 50,
        width: "80%",
      },
      buttonRow: {
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
        alignItems: "center",
      },
      button:{
        height : 40,
        width : 100,
        justifyContent : "center",
        borderRadius : 20,
        backgroundColor :'#0000ff',
        marginTop: 30
       
      },
      rawText: {
        fontSize: 18,
        fontWeight: "500",
        padding: 10,
        color:"black"
      },
      paymentHeader:{
        fontSize: 25,
        padding: 10,
        fontWeight:"bold",
        color:"black"


      },
      slots: {
        width: "100%",
        paddingLeft: 25,
      },
      itemText: {
        color: "white",
        fontSize: 15,
      },

})



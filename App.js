import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text,Modal, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [tarea,setTarea]=useState("")
  const [lista,setLista]=useState([])

  const[tareaSeleccionada, setTareaSeleccionada]=useState("")
  const[modalVisible, setModalvisible]=useState(false)

  const Agregar=()=>{
    if(tarea!=""){
    setLista([
      ...lista,
      {
        id: Math.random().toString(),
        value: tarea,
      }
    ])
    setTarea("")
  }}

  const modalFinish=()=>{
    const id=tareaSeleccionada.id
    setLista(lista.filter(item=>item.id !== id))
    setModalvisible(false)
    setTareaSeleccionada({})
  }

  const modalInProgress=()=>{
    const id=tareaSeleccionada.id
    setModalvisible(false)
  }

  const modalRechazo =id=>{
    setTareaSeleccionada(lista.find(item=>item.id === id))
    setModalvisible(true)
  }

  const borrarLista=()=>{
    setLista([])
  }


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Tareas</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Nueva tarea"
            onChangeText={setTarea}
            value={tarea}
          />
          <Button 
            style={styles.buttonContainer} 
            color="#818479" 
            title="Agregar"
            onPress={Agregar}
          />
        </View>
        <View style={styles.listContainer}>
          <FlatList 
            data={lista}  
            renderItem={data => {
              return (
                <View style={styles.list}>
                  <Text style={styles.textList}>{data.item.value}</Text>
                  <Button 
                    style={styles.buttonDelete} 
                    color="#818479" 
                    title="Eliminar"
                    onPress={()=> modalRechazo(data.item.id)}
                  />
                </View>
              )
            }}
            keyExtractor={item => item.id}
          />
          <Modal  animationType="slide" visible={modalVisible}>
            <View style={styles.modal}>
              <Text style={styles.textModal} >Terminaste de:  {tareaSeleccionada.value} ?</Text>
                <View style={styles.buttonModal}>
                  <Button 
                    style={styles.buttonModalSi}
                    onPress={modalFinish}
                    title="Si, terminé" 
                    color="#818479"
                  />
                  <Button 
                    style={styles.buttonModalNo} 
                    title="No aun"
                    color="#818479"
                    onPress={modalInProgress}
                  />
                </View>
            </View>
          </Modal>
        </View>
        <View style={styles.botonBorrarLista}>
          <Button 
            title="Borrar todo"
            color="#818479"
            onPress={borrarLista}
          />
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:35,
    backgroundColor:"#e4e9b2"
  },

  title:{
    fontSize:25,
    alignSelf:"center",
  },

  inputContainer:{
    padding:15,
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between"
  },

  input:{
    width:"70%",
    borderBottomColor:"black",
    borderBottomWidth:1,
  },

  buttonContainer:{
    
  },

  listContainer:{
    marginTop:30,
    alignSelf:"center",
    width:"85%",
    backgroundColor:"#e7e08b"
  },

  list:{
    width:"100%",
    justifyContent:"space-between",
    padding:15,
    flexDirection:"row",
    width:200,
  },

  textList:{
    width:220,
    borderBottomWidth:1,
  },

  modal:{
    height:"50%",
    width:"90%",
    margin:15,
    marginTop:"40%",
    flexDirection:"column",
    justifyContent:"space-evenly",
    alignSelf:"center",
    alignItems:"center",
    borderColor:"black",
    borderWidth:1,
    backgroundColor:"#e7e08b",
  },

  buttonModal:{
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-evenly",

  },

  buttonModalSi:{
    width:30,
    height:30,
  },

  textModal:{
    fontSize:25,
  },

  botonBorrarLista:{
    width:"30%",
    alignSelf:"center",
  },
});

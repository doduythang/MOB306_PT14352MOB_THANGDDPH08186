import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    FlatList,
    Button,
    Modal,
    ImageBackground,
    TouchableHighlight,
    Alert,
    TouchableOpacity,
    Switch
}
    from 'react-native'
import { registerRootComponent } from 'expo'
import InfoText from './info-text'

function App() {

    const [subjects, setSubjects] = useState([]);
    const [info, setInfo] = useState(user);
    const [showInfo, setShowInfo] = useState(true);
    const [inputUserName, setInputUserName] = useState('');
    const [inputAge, setInputAge] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [inputTotal_Chapters, setInputTotal_Chapters] = useState('')
    const [inputNameSbj, setInputNameSbj] = useState('');
    const [showModal, setShowModal] = useState(true);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalList, setShowModalList] = useState(false);


    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [total_chapters, setTotal_chapters] = useState('');
    const [is_full, setIs_full] = useState(true);
    const [id, setId] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);

    const user = {
        name: '',
        age: ''
    }

    const setDefaultTextInputLogin = () => {
        setInputUserName('');
        setInputAge('');
    }

    const handleShowList = () => {
        user.name = inputUserName,
            // user.age = inputAge,
            setInfo(user);
        setShowModal(false);
        setShowModalList(true);
        setDefaultTextInputLogin();
    }

    const setDefaultTextInputSbj = () => {
        setInputNameSbj('');
        setInputCategory('');
        setInputTotal_Chapters('')
    }
    

    const API = 'https://5e63524af48bc60014536aa7.mockapi.io/api/subjects';
    //Dinh nghia ham xu ly cong viec call API
    const fetchSubjects = () => {
        return fetch(
            API,
            {} // object khai bao method, header(kieu du lieu gui len, kieu du lieu nhan ve), body(data gui len)
        )
            .then((response) => response.json())
            .then((responseJson) => { setSubjects(responseJson) })
            .catch((error) => console.log(error));
    };
    useEffect(
        () => {
            fetchSubjects();
        }, []
    )



    const setSubject = (response) => {
        setName(response.name);
        setCategory(response.category);
        setTotal_chapters(response.total_chapters);
        setThumbnail(response.thumbnail);
        setIs_full(response.is_full);
        setIsUpdate(response.id);
        setId(response.id);
        setShowModalDetail(true);
        setShowModalList(false);

    }
    const getItemFromAPI = (id) => {
        return fetch(
            API + "/" + id
        ).then((response) => response.json())
            .then((responseJson) => {
                setShowModalDetail(true);
                setSubject(responseJson);

            })
            .catch((error) => console.error(error))
    }

    const handleDelete = (id) => {
        deleteSubject(id);

        fetch(
            `${API}/${id}`,
            { method: 'DELETE' }
        ).then(() => {
        })
            .catch((error) => console.log(error));
    }

    const deleteSubject = (id) => {
        const newSubject = subjects.filter(item => item.id != id);
        setSubjects(newSubject);
    }
    const putItem = () => {

        const subject = {
            thumbnail: thumbnail,
            name: name,
            category: category,
            total_chapters: total_chapters,
            is_full: is_full
        };

        fetch(
            `${API}/${id}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            }
        ).then((reponse) => {reponse.json() })
            .then(() => fetchSubjects())
            .catch(error => console.log('error', error))
          
    }

    const showEditModal = (id) => {
        const subject = subjects.find((item) => item.id == id);
        setModalData(subject);
        setShowModalEdit(true);
        setShowModalList(false);
       
    }
    const handleValidateSbj = () => {

        setShowModalAdd(false);
        setShowModalList(true);
        setDefaultTextInputSbj();
        createItem();
        console.log(subjects);
    }

    const handlePutItem = () => {
        setShowModalEdit(false);
        setShowModalList(true);
        putItem();
        
    }

    const createItem = () => {

        const subject = {
            name: name,
            category: category,
            thumbnail: thumbnail,
            total_chapters: total_chapters,
            is_full: is_full,


        };
        fetch(
            API,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            }
        ).then((reponse) => reponse.json())
            .then(() => fetchSubjects())
            .catch(error => console.log('error', error))
    }
    




    const setModalData = (data) => {
        setName(data.name);
        setCategory(data.category);
        setThumbnail(data.thumbnail);
        setTotal_chapters(data.total_chapters);
        setIs_full(data.is_full)
        setIsUpdate(data.id); // set isUpdate = id -> neu co id thi se hieu la true, con k co id thi se la undefined -> hieu la false
    }


    return (
        <View>
            <Modal visible={showModal}>
                <View style={styles.container}>
                    <Text style={styles.text}>Name</Text>
                    <TextInput style={styles.textInput} value={inputUserName} onChangeText={(value) => setInputUserName(value)} />
                    <Text style={styles.text}>Age</Text>
                    <TextInput keyboardType='number-pad' style={styles.textInput} value={inputAge} onChangeText={(value) => setInputAge(value)} />

                    <TouchableHighlight
                        style={styles.submit}
                        onPress={() => {
                            if (inputUserName == '' || inputAge == '') {
                                Alert.alert('Bạn phải nhập đủ thông tin')
                            }
                            else if (inputAge < 18) {
                                Alert.alert('Bạn phải lớn hơn 18 tuổi')
                            }
                            else {
                                handleShowList();
                            }
                        }
                        }
                    >
                        <Text style={styles.submitText}>Vào đọc truyện</Text>
                    </TouchableHighlight>

                </View>
            </Modal>

            <Modal visible={showModalList}>

                <View style={{ flex: 1, flexDirection: "column", marginTop: Platform.OS === 'ios' ? 34 : 0 }}   >
                    <View style={{ height: 64 }}>
                        <Text>--------------</Text>
                        {showInfo ? <InfoText data={info} /> : null}
                        <TouchableHighlight
                            style={styles.submit}
                            onPress={() => {
                                setShowModalAdd(true);
                                setShowModalList(false)
                            }} underlayColor='#fff'>
                            <Text style={styles.submitText}>Add Subject</Text>
                        </TouchableHighlight>

                    </View>

                    <FlatList
                        data={subjects}
                        renderItem={({ item }) => (
                            <View style={styles.listContainer}>
                                <View style={styles.viewBoder}>
                                    <Image style={styles.logo} source={{ uri: item.thumbnail }} />
                                </View>
                                <View style={styles.textList}>
                                    <Text>Name: {item.name}</Text>
                                    <Text>Category: {item.category}</Text>
                                    <Text>Total Chapters: {item.total_chapters}</Text>
                                    <Text>{`Status: ${item.is_full ? 'Full' : 'Not full'}`}</Text>

                                </View>
                                <View style={styles.btnList}>
                                    <TouchableHighlight
                                        style={styles.submit}
                                        onPress={() => getItemFromAPI(item.id)}>
                                        <Text style={styles.submitText}>Detail</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={styles.submit}
                                        onPress={() => handleDelete(item.id)}
                                        underlayColor='#fff'>
                                        <Text style={styles.submitText}>Delete</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={styles.submit}
                                        onPress={() => showEditModal(item.id)}
                                        underlayColor='#fff'>
                                        <Text style={styles.submitText}>Edit</Text>
                                    </TouchableHighlight>

                                </View>

                            </View>



                        )}
                        keyExtractor={(item, index) => item.id}


                    />
                </View>
            </Modal>


            <Modal visible={showModalEdit} >
                <View style={styles.editContainer}>

                    <Image style={styles.logo} value={thumbnail} source={{ uri: thumbnail }} />
                    <View>
                        <Text> Name</Text>
                        <TextInput style={styles.textInput} value={name} onChangeText={(value) => setName(value)} />
                    </View>
                    <View>
                        <Text>Category</Text>
                        <TextInput style={styles.textInput} value={category} onChangeText={(value) => setCategory(value)} />
                    </View>
                    <View>
                        <Text>Total Chapters</Text>
                        <TextInput  style={styles.textInput} value={total_chapters} onChangeText={(value) => setTotal_chapters(value)} />
                    </View>
                    <View>
                        <Text>Status</Text>
                        <Switch value={is_full} onValueChange={() => setIs_full(!is_full)} />

                    </View>
                    <View>
                        <TouchableHighlight
                            style={styles.submit}
                            underlayColor='#fff'
                            onPress={() => {
                                if (name == '' || category == '' || total_chapters == '') {
                                    Alert.alert('Bạn phải nhập đủ thông tin')
                                }
                                else {
                                    handlePutItem();
                                    

                                }
                            }
                            }
                        >
                            <Text style={styles.submitText}>Submit</Text>


                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.submit}
                            onPress={() => {
                                setShowModalEdit(false);
                                setShowModalList(true)

                            }}
                            underlayColor='#fff'>
                            <Text style={styles.submitText}>Cancel</Text>
                        </TouchableHighlight>

                    </View>
                </View>
            </Modal>

            <Modal visible={showModalAdd} >
                <View style={styles.editContainer}>


                    <View>
                        <Text> Name</Text>
                        <TextInput style={styles.textInput} value={name} onChangeText={(value) => setName(value)} />
                    </View>
                    <View>
                        <Text>Category</Text>
                        <TextInput style={styles.textInput} value={category} onChangeText={(value) => setCategory(value)} />
                    </View>
                    <View>
                        <Text>Total Chapters</Text>
                        <TextInput keyboardType='number-pad' style={styles.textInput} value={total_chapters} onChangeText={(value) => setTotal_chapters(value)} />
                    </View>
                    <View>
                        <Text>Thumbnail</Text>
                        <TextInput style={styles.textInput} value={thumbnail} onChangeText={(value) => setThumbnail(value)} />
                    </View>
                    <View>
                        <Text>Status</Text>
                        <Switch value={is_full} onValueChange={() => setIs_full(!is_full)} />

                    </View>
                    <View>
                        <TouchableHighlight
                            style={styles.submit}
                            underlayColor='#fff'
                            onPress={() => {
                                if (name == '' || category == '' || total_chapters == '') {
                                    Alert.alert('Bạn phải nhập đủ thông tin')
                                }
                                else {
                                    handleValidateSbj();

                                }
                            }
                            }
                        >
                            <Text style={styles.submitText}>Submit</Text>


                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.submit}
                            onPress={() => {
                                setShowModalAdd(false);
                                setShowModalList(true)

                            }}
                            underlayColor='#fff'>
                            <Text style={styles.submitText}>Cancel</Text>
                        </TouchableHighlight>

                    </View>
                </View>
            </Modal>



            <Modal visible={showModalDetail}>
                <View style={styles.container_detail}>
                    <View style={styles.image} >
                        <Image style={styles.image} source={{ uri: thumbnail }} />
                    </View>
                    <View>

                        <Text style={styles.textDetail}>ID: {id}</Text>

                        <Text style={styles.textDetail}>Name: {name}</Text>

                        <Text style={styles.textDetail}>Catogery: {category}</Text>

                        <Text style={styles.textDetail}>Total chapters: {total_chapters}</Text>

                        <Text style={styles.textDetail}>{`Status: ${is_full ? 'Full' : 'Not full'}`}</Text>




                    </View>

                    <View style={styles.containerButton}>
                        <TouchableOpacity disabled={false}
                            onPress={
                                () => {
                                    setShowModalDetail(false);
                                    setShowModalList(true);
                                }
                            }
                            style={styles.button}>
                            <Text style={styles.text}>Back</Text>

                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>





        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
    text: {
        color: 'black'

    },
    textInput: {
        fontSize: 15,
        color: "#00CC66",
        borderColor: "#00CC66",
        borderWidth: 1,
        width: 400,
        margin: 8,
        height: 45,
        paddingLeft: 8
    },
    submit: {
        overflow: 'hidden',
        marginRight: 40,
        marginLeft: 40,
        marginTop: 5,
        padding: 10,
        backgroundColor: '#00CC66',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    colum: {
        justifyContent: "center",
        flex: 1,

        flexDirection: 'column',
        backgroundColor: 'white',

        borderColor: "#00CC66",
        marginTop: 20


    },
    imgModel: {

        margin: 10,
        padding: 10,
        marginBottom: 10,
        width: 175,
        height: 300,
        borderRadius: 1
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    },
    viewBoder1: {


        padding: 10,
        backgroundColor: "#ffff",
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#00CC66',
        marginBottom: 20

    },
    h1: {
        padding: 5,
        fontSize: 20,

    },
    h2: {
        marginLeft: 5,
        padding: 5,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 2

    },
    image: {

        borderRadius: 60,
        width: 120,
        height: 120
    },
    container_detail: {

        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDetail: {
        color: 'black',
        padding: 8,
        fontSize: 15
    },
    button: {
        width: 100,
        display: 'flex',
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2AC062',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    editContainer: {
        marginTop: 50,
        alignItems: 'center',
        flex: 1
    },
    listContainer: {
        paddingTop: 10,
        borderBottomColor: '#00CC66',
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'white',

        borderColor: "#00CC66"
    }, viewBoder: {


        padding: 10,
        backgroundColor: "#ffff",
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#00CC66',
        marginBottom: 20

    },
    textList: {
        flex: 1,
        flexDirection: "column",
        flexGrow: 1,
        marginLeft: 20,
    },
    btnList: {

    },
    solid: {
        height: 1,
        backgroundColor: "#00CC66"
    }

});

export default registerRootComponent(App);
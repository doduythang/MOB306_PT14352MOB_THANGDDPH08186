import React, {useState} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Switch,
    Modal,
    Button,
    TextInput,
    Picker
} from 'react-native';
import InfoText from './info-text';
import SubjectItem from './subject-item';

export default function Profile() {
    const userProfile = {
        info: {
            avatar: 'https://iap.poly.edu.vn/user/ph/PH09025.jpg',
            name: 'Nguyen Van A',
            email: 'a@gmail.com',
            address: 'HN',
            phone: '0123456789',
            active: true
        },
        subjects: [
            {
                name: 'React Native',
                identity: 'MOB306',
                className: 'PT14352',
            },
            {
                name: 'React Native',
                identity: 'MOB307',
                className: 'PT14352',
            },
            {
                name: 'React Native',
                identity: 'MOB308',
                className: 'PT14352',
            }
        ]
    };
    // Khai bao state + ham thay doi gia tri cua no
    const [showInfo, setShowInfo] = useState(true);
    // Chuyen viec su dung userprofile sang state, de khi user thay doi gia tri se render lai man hinh
    const [user, setUser] = useState(userProfile);
    // Tao state kiem soat viec hien thi cua modal add subject
    const [showModal, setShowModal] = useState(false);

    // Khai bao ham thuc hien cong viec xoa
    const handleDeleteSubject = (identity) => {
        // su dung let de co the gan gia tri moi
        let newSubjectList = user.subjects;
        // filter ((item) => tra ve dieu kien ma item do se duoc xu ly)
        // sau khi filter xong (chay het vong lap voi dieu kien dua ra) -> tra ve mang moi co cac item thoa man dk

        newSubjectList = newSubjectList.filter((subject) => subject.identity != identity);
        userProfile.subjects = newSubjectList;
        console.log(userProfile);

        setUser(userProfile);
    }

    // Khai bao state + ham thay doi gia tri cua modal them subject
    const [inputSubjectName, setInputSubjectName] = useState('');
    const [inputSubjectId, setInputSubjectId] = useState('');
    const [pickerSubjectClass, setPickerSubjectClass] = useState("PT1111");

    const setSubjectValue = (name, id, subjectClass) => {
      setInputSubjectName(name);
      setInputSubjectId(id);
      setPickerSubjectClass(subjectClass);
    }
    // Tao ham va xu ly viec add subject
    const handleAddSubject = (isEdit) => {
      const newSubject = {
        name: inputSubjectName,
        identity: inputSubjectId,
        className: pickerSubjectClass
      };

      let newSubjectList = user.subjects;
      if (isEdit) {
        // Update thong tin
        const subjectEditIndex = newSubjectList.findIndex((subject) => subject.identity == inputSubjectId);
        newSubjectList[subjectEditIndex] = newSubject;
      } else {
        newSubjectList.push(newSubject);
      }
      userProfile.subjects = newSubjectList;

      setUser(userProfile);
      setShowModal(false);
      setSubjectValue('', '', 'PT1111');
      setEditStatus(false);
    }

    // Khai bao state luu trang thai co dang edit hay khong
    const [isEdit, setEditStatus] = useState(false);

    // Tao ham xu ly viec edit 1 subject
    const handleEditSubject = (identity) => {
      // Set trang thai edit thanh true
      setEditStatus(true);

      // Lay thong tin cua subject can sua
      const subject = user.subjects.find((subject) => subject.identity == identity);
      // Hien thi thong tin subject o modal edit
      setSubjectValue(subject.name, subject.identity, subject.className);
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
      setSubjectValue("", "", "PT1111");
      setEditStatus(false);
    }

    // console.log(user.subjects);
    return (
      <View style={style.profileContainer}>
        <View style={style.avatar}>
          <Image style={style.image} source={{ uri: user.info.avatar }} />
          <Switch
            value={showInfo}
            onValueChange={() => setShowInfo(!showInfo)}
          />
        </View>
        <Text>--------------</Text>
        <View>
          {showInfo ? <InfoText data={user.info} /> : null}
          <Text>--------------</Text>
          <Button
            title="Add subject"
            onPress={() => {
              setShowModal(true);
            }}
          />
          <FlatList
            data={user.subjects} // mảng nhận vào để hiển thị danh sách
            renderItem={({ item }) => (
              <SubjectItem
                item={item}
                handleDelete={handleDeleteSubject}
                handleEdit={handleEditSubject}
              />
            )} // item ứng với {name: '', identity: '', className: ''}
            keyExtractor={(item, index) => index}
          />
        </View>
        <Modal visible={showModal}>
          <View>
            <Text>Modal Add Subject</Text>
            <Text>Name</Text>
            <TextInput
              value={inputSubjectName}
              onChangeText={value => setInputSubjectName(value)}
            />
            <Text>Identity</Text>
            <TextInput
              editable={!isEdit}
              value={inputSubjectId}
              onChangeText={value => setInputSubjectId(value)}
            />
            <Text>Select Class Name</Text>
            <Picker
              selectedValue={pickerSubjectClass}
              onValueChange={value => setPickerSubjectClass(value)}
            >
              <Picker.Item value="PT1111" label="PT1111" />
              <Picker.Item value="PT1112" label="PT1112" />
              <Picker.Item value="PT1113" label="PT1114" />
            </Picker>
            <Button
              title="Submit"
              onPress={() => {
                handleAddSubject(isEdit);
              }}
            />
            <Button
              title="Cancle"
              onPress={() => {
                handleCloseModal();
              }}
            />
          </View>
        </Modal>
      </View>
    );
}

const style = StyleSheet.create({
    profileContainer: {},
    avatar: {},
    image: {
        width: 200,
        height: 200,
        borderRadius: 200
    }
});

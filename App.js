import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
// Import component duoc tao ra o thu muc content
import ContentFirst from './content/content1';
import SecondContent from './content/content2';
import ThirdContent from './content/content3';
import List from './list';
import Profile from './profile';

export default function App() {
  const content = 'FPT POLY';

  const gptb1 = (a, b) => {
    if (a == 0 && b == 0) {
      return('vo so nghiem');
    }

    if (a == 0 && b != 0) {
      return('vo nghiem');
    }

    if (a != 0 && b != 0) {
      return(-b / a);
    }

    if (a != 0 && b == 0) {
      return(-b / a);
    }
  }

  const valueGpt = gptb1(3, 4); // c1

  const contentFirst = "CONTENT FIRST PT14352MOB POLY";
  const contentSecond = "CONTENT SECOND PT14352MOB POLY";
  const contentThird = "CONTENT THIRD PT14352MOB POLY";

  const arrayContent = [
    "CONTENT FIRST PT14352MOB POLY",
    "CONTENT SECOND PT14352MOB POLY",
    "CONTENT THIRD PT14352MOB POLY"
  ];
  // Do khong viet duoc truc tiep for ngay trong return jsx, chuyen phan noi dung ve 1 mang,
  // hoac 1 ham return ve mang noi dung do

  // Cach 1, truyen du lieu vao mang, su dung mang do o trong return
  // Khai bao mang rong
  const contentText = [];
  // Thuc hien vong lap
  for (let i = 0; i < 10; i++) {
    // Kiem tra vi tri chan
    if (i % 2 == 0) {
      // Push component hien thi vao trong mang
      contentText.push(<ContentFirst content={`${contentFirst} -> vi tri ${i}`} />);
    }
  }
  // Khi ket thuc vong for, ta se co 1 mang gom cac phan thu la cac component hien thi

  // Khai bao gia tri cho danh sach
  // 1. Danh sach -> la array
  // 2. Moi mot row se bao gom avatar, name, address, email
  //     => moi item trong array se la 1 object co cac thuoc tinh nhu ben tren
  const listUser = [
    {
      avatar: '',
      name: 'Nguyen Van A',
      address: 'Ha Noi',
      email: 'a@gmail.com'
    },
    {
      avatar: '',
      name: 'Nguyen Van B',
      address: 'Ha Noi',
      email: 'b@gmail.com'
    },
    {
      avatar: '',
      name: 'Nguyen Van C',
      address: 'Ha Noi',
      email: 'c@gmail.com'
    },
    {
      avatar: '',
      name: 'Nguyen Thi D',
      address: 'Ha Noi',
      email: 'd@gmail.com'
    },
  ];

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", marginTop: 200 }}>
        {/* <Text style={{color: 'red', fontSize: 60}}>{`Truong ten la: ${content}`}</Text>
      <Image source={require('./PH11674.jpg')} />
      <Image source={{ uri: 'https://iap.poly.edu.vn/logo.png'}}
        style={myStyle.image}
      /> */}
        {/* Su dung component da import ben tren, truyen props sang duoi dang 1 thuoc tinh cua component */}
        {/* {contentText} */}
        {/* <Text>-------------------------</Text> */}
        {/* Cho cac ban giai dap */}
        {/* {
          // Gia tri cac tham so nhan duoc se nam o ngoac thu 2
          ((contentFirst) => {
            const contentText = [];
            // Thuc hien vong lap
            for (let i = 0; i < 10; i++) {
              // Kiem tra vi tri chan
              if (i % 2 == 0) {
                // Push component hien thi vao trong mang
                contentText.push(
                  <ContentFirst content={`${contentFirst} -> vi tri ${i} trong arrow function`} />
                );
              }
            }

            return contentText;
          })
          (contentFirst)
        } */}
        {/* <Text>-------------------------</Text> */}
        {/* Sau khi tao ds thi se truyen sang cho component List duoi dang 1 props ten la data, gia tri la listUser */}
        {/* <List data={listUser} /> */}
        <Profile />
      </View>
    </ScrollView>
  );
}

const myStyle = StyleSheet.create(
  {
    app: {
      backgroundColor: '#ccc',
      fontSize: 30
    },
    text: {
      color: '#fff'
    },
    image: {
      width: 300,
      height: 400
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

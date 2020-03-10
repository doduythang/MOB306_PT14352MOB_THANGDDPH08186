// React hook -> cach dang su dung
// React Class -> cach cu
import React, {useState} from 'react'; // chu y viec import useState trong ngoac nhon
import {Text, View, Image, StyleSheet, Switch} from 'react-native';
import Row from './row';

// Thuc hien cong viec lien quan den state o component List
// KHI STATE THAY DOI, THI CHI COMPONENT CHUA NO RENDER LAI, CON LAI KHONG THAY DOI GI HET

// Khi ten file la index.js thi ben import se chi can tro den thu muc
// import xxx from './list' -> './list/index'
export default function List({data})
{
    // Khai bao su dung state ngay ben duoi phan khai bao component
    // const [ten_state, ten_ham_su_dung_thay_doi_gia_tri_state] = useState(gia_tri_mac_dinh_cua_state);
    const [showList, setShowList] = useState(true);
    // showList: state luu trang thai hien thi danh sach

    // setShowList: function thay doi gia tri cua showList
    // setShowList(false) -> showList gan gia tri moi = false

    // useState(true): dinh nghia ra cap state va function thay doi gia tri state,
    // voi gia tri mac dinh cua showList = true

    // khi showList = true thi se hien thi danh sach, con false thi se an danh sach
    const renderRow = () => {
        // Khai bao mang rong de lay cac phan hien thi tung row vao
        const list = [];

        for(let i = 0; i < data.length; i++) {
            // Cach khac de truyen gia tri cho show
            // let show = true;
            // if (showList == true && i%2 == 0) {
            //     show = true;
            // } else {
            //     show = false;
            // }
            // truyen show vao props show trong Row
            const row = (
                <Row show={true} item={data[i]} />
            );
            // Push row vua nhan duoc vao trong list
            if (showList == true && i%2 == 0) {
                list.push(row);
            }

            if (showList == false && i%2 != 0) {
                list.push(row);
            }
        }
        // cach 1: xu ly viec return list, khi return se thoat khoi ham renderRow() va khong chay ra ngoai if nua
        // if (showList == true) { // tuong tu viec viet if(showList){}
            return list;
        // }

        // return [];
    }

    return(
            // trang thai hien tai: bat -> chuyen sang: tat
            // trang thai la: tat -> chuyen sang: bat
            // Su dung switch de thay doi gia tri cua state showList, nham kiem soat viec an hien cua danh sach
        <View>
            <Switch value={showList} onValueChange={() => setShowList(!showList)} />
            {renderRow()}
        </View>
    );
}

const style = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 20,
        margin: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    right: {
        marginLeft: 20,
        fontSize: 30,
        fontStyle: "italic"
    }
});

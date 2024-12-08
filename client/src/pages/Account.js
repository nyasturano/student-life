import { TouchableOpacity, View, Text, StyleSheet, Linking, Image  } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import { userUnauthorized } from "../actions";
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';

// const buttons = [
//   { title: 'Зачетка', screen: 'Зачетка', image: 'https://storage.yandexcloud.net/kubsu/pencile.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEcmoZvXbnQ6Eno7Ocesa2%2F20241207%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20241207T093515Z&X-Amz-Expires=2592000&X-Amz-Signature=F2AB7DF34795DB86D2773F3DC4B108C55EE43848D2D8B1DF324076D352CFCA88&X-Amz-SignedHeaders=host' },
//   { title: 'Курсы', screen: 'Курсы', image: 'https://storage.yandexcloud.net/kubsu/case.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEcmoZvXbnQ6Eno7Ocesa2%2F20241207%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20241207T093644Z&X-Amz-Expires=2592000&X-Amz-Signature=49C00BB6D2808090DBBF7448916D012C51E32410759BB77BB52661D7AB76479E&X-Amz-SignedHeaders=host' },
//   { title: 'Навигатор', screen: 'Навигатор', image: 'https://storage.yandexcloud.net/kubsu/navigator.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEcmoZvXbnQ6Eno7Ocesa2%2F20241207%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20241207T093616Z&X-Amz-Expires=2592000&X-Amz-Signature=E8B1C7501C4C019535840CE6830D309C87EB081440B11A7C024FF62EE12086B6&X-Amz-SignedHeaders=host' },
//   { title: 'Где поесть', screen: 'Где поесть', image: 'https://storage.yandexcloud.net/kubsu/cart.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEcmoZvXbnQ6Eno7Ocesa2%2F20241207%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20241207T093558Z&X-Amz-Expires=2592000&X-Amz-Signature=FF69CA07DA36680829D68205B99D5FC22054544F8C5CF8ABFD5D0AE5DD8E12E1&X-Amz-SignedHeaders=host' },
//   { title: 'Жилье', screen: 'Жилье', image: 'https://storage.yandexcloud.net/kubsu/home.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEcmoZvXbnQ6Eno7Ocesa2%2F20241207%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20241207T093543Z&X-Amz-Expires=2592000&X-Amz-Signature=590D8811D1FD9925D28186C50D9994B24E6FB4569AC27CAED763C7507BB6A302&X-Amz-SignedHeaders=host' },
//   { title: 'Инфо', screen: 'Инфо', image: 'https://storage.yandexcloud.net/kubsu/star.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEcmoZvXbnQ6Eno7Ocesa2%2F20241207%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20241207T093459Z&X-Amz-Expires=2592000&X-Amz-Signature=24A2E8DB0A2713EDC024734B6D44B03000D85C2A69052782CD51803509A42B71&X-Amz-SignedHeaders=host' },
// ];

const buttons = [
  { title: 'Зачетка', screen: 'Зачетка', image: 'https://kubsu.hb.ru-msk.vkcloud-storage.ru/pencile.png' },
  { title: 'Курсы', screen: 'Курсы', image: 'https://kubsu.hb.ru-msk.vkcloud-storage.ru/case.png' },
  { title: 'Навигатор', screen: 'Навигатор', image: 'https://kubsu.hb.ru-msk.vkcloud-storage.ru/navigator.png' },
  { title: 'Где поесть', screen: 'Где поесть', image: 'https://kubsu.hb.ru-msk.vkcloud-storage.ru/cart.png' },
  { title: 'Жилье', screen: 'Жилье', image: 'https://kubsu.hb.ru-msk.vkcloud-storage.ru/home.png' },
  { title: 'Инфо', screen: 'Инфо', image: 'https://kubsu.hb.ru-msk.vkcloud-storage.ru/star.png' },
];


export default function Account({navigation}) {

  const auth  = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logOut = async () => {
    await SecureStore.deleteItemAsync('authToken')    
    dispatch(userUnauthorized())
  }

  return (

    <View style={styles.container}>
        <View animation="fadeInUp" duration={1000} delay={500} style={styles.profileContainer}>
          <View style={styles.avatar}>        
            <AntDesign name="user" size={54} color="#007BFF" />
          </View>
          <View style={styles.profile}>
            <Text style={styles.name}>Иванов Иван</Text>
            <Text style={styles.info}>Экономический факультет, 1 курс</Text>
          </View>
          <TouchableOpacity onPress={logOut}>
            <Text style={{color: 'white'}}>Выйти</Text>
          </TouchableOpacity>
        </View>

      <View animation="fadeInUp" duration={1000} delay={500} style={styles.buttons}>
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate(button.screen)}>
            <View style={styles.buttonContainer}>
              <Image style={styles.buttonImage} source={{ uri: button.image }} />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>{button.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View animation="fadeInUp" duration={1000} delay={500} style={styles.additionalOptions}>
        <TouchableOpacity
          onPress={() => {
            const telegramBotUrl = 'https://t.me/StudentsLifeKubsu_bot';

            Linking.openURL(telegramBotUrl)
              .catch((error) => {
                console.error('Ошибка при открытии ссылки: ', error);
              });
          }}
        >
          <View style={styles.additionalOptionsButton}>
            <Text style={styles.additionalOptionsButtonText}>Дополнительные возможности</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profileContainer: {
    justifyContent: 'space-between',
    backgroundColor: '#323643',
    borderRadius: 12,
    width: '90%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  profile: {
    marginRight: 10,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 54,
    justifyContent: 'center',
  },
  avatarImage: {
    width: 54,
    height: 54,
    borderRadius: 54,
  },
  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
  },
  info: {
    color: '#9398A1',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
  },
  buttons: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonImage: {
    width: 170,
    height: 160,
  },
  buttonTextContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  additionalOptions: {
    backgroundColor: '#323643',
    borderRadius: 12,
    width: '90%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  additionalOptionsButton: {
    flex: 1,
    justifyContent: 'center',
  },
  additionalOptionsButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
  },
});
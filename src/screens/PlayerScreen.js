import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from '../design/Image';
import { Text } from '../design/Text';

export default function PlayerScreen({ navigation, route }) {
  const { player } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: `${player.firstName} ${player.lastName}`,
    });
  }, [navigation]);

  if (!player || !player.pid) {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text typography="h1" value={`#${player.number} - ${player.position}`} style={styles.title} />
      <Image uri={player.url.replace('50x50', '150x150')} height={150} width={150} />
      {player.club && (
        <View style={styles.row}>
          <Image uri={player.club.imageUrl} style={styles.clubImage} />
          <Text typography="p1" value={player.club.name} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  clubImage: {
    height: 50,
    marginRight: 10,
    width: 50,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    marginHorizontal: 16,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginVertical: 16,
  },
  title: {
    marginBottom: 16,
  },
});

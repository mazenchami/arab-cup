import { useEffect } from 'react';
import { StyleSheet, FlatList, Pressable, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from '../design/Image';
import { Text } from '../design/Text';
import { Divider } from '../design/Divider';

const PlayerRow = ({ player, onPress = undefined }) => {
  const { firstName, lastName, url, } = player;
  return (
    <Pressable disabled={!onPress} onPress={onPress} style={styles.row}>
      <Image uri={url} />
      <Text typography="p1" value={`${firstName} ${lastName}`} />
    </Pressable>
  );
};

export default function PlayersScreen({navigation, route}) {
  const teamName = route.params.teamName;
  const players = route.params.players;

  useEffect(() => {
    navigation.setOptions({
      title: `Players of ${teamName}`,
    });
  }, [navigation]);

  if (!teamName || !players || players.length === 0) {
    navigation.goBack();
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <FlatList
        ItemSeparatorComponent={Divider}
        data={players}
        keyExtractor={player => player.pid}
        renderItem={({item}) => (
          <PlayerRow key={item.pid} player={item} onPress={() => navigation.navigate('Player', {player: item})} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  image: {
    height: 50,
    width: 50,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
});

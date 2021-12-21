import { useCallback, useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View, } from 'react-native';
import { Image } from '../design/Image';
import { LoadingScreen } from '../design/LoadingScreen';

import { Text } from '../design/Text';

const TeamCard = ({ team, onPress = undefined }) => {
  const {logoUrl, name, nicknames, websiteUrl} = team;
  return (
    <Pressable onPress={onPress} style={styles.teamCard}>
      <Text
        color="black"
        typography="h2"
        value={name}
      />
      <View style={styles.row}>
        <Image height={100} width={100} uri={logoUrl} />
        <View style={styles.teamInfo}>
          <View style={styles.row}>
            <Text typography="p2" value="Website: " />
            <Text
              typography="p2"
              value={websiteUrl}
              onPress={() => Linking.openURL(websiteUrl)}
              style={styles.link}
            />
          </View>
          <Text typography="p2" value={`Nicknames: ${nicknames.join(', ')}`} />
        </View>
      </View>
    </Pressable>
  );
};

export default function TeamsScreen({navigation}) {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState({});

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await fetch('https://raw.githubusercontent.com/mazenchami/FIFA-Arab-Cup-2021-Rosters/main/full.json');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (isFetching || !data.teams) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView contentContainerStyle={{}} style={styles.container}>
      {data.teams.map(team => {
        const players = data.players.filter(player => player.tid === team.tid);
        return (
          <TeamCard key={team.tid} team={team} onPress={() => navigation.navigate('Players', {players, teamName: team.name})} />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  teamCard: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    marginVertical: 8,
    padding: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  teamInfo: {
    flex: 1,
    marginLeft: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

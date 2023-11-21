<template>
  <main>
    <div class="search-container">
      <input v-model="searchTerm" placeholder="Digite o termo de busca" @keyup.enter="searchAlbums">
      <button @click="searchAlbums">A
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" class="icon-color" />
      </button>
    </div>
    {{ albums.length }}
    <div class="albums-container">
      <div class="album-card" v-for="(album, index) in albums" :key="index">
        <img :src="album.images[0].url" alt="Album Cover" class="album-cover">
        <h3 class="album-title">{{ album?.name }}</h3>
        <p><span v-for="(artist, index) in album?.artists" :key="index">{{ artist.name }}</span></p>
        <p class="album-title">{{ album?.release_date }}</p>
        <p>Ver mais</p>
      </div>
    </div>

    <!-- <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Photo</th>
          <th>Title</th>
          <th>Release Date</th>
          <th>Artists</th>
          <th>Details</th>
        </tr>
      </thead>
      <tr v-for="(album, index) in albums" :key="index">
        <td>{{ index }}</td>
        <img :src="album.images[0].url" alt="Album Cover" class="album-cover">
        <td>{{ album?.name }}</td>
        <td>{{ album?.release_date }}</td>
        <td>{{ album?.artists[0].name }}</td>
      </tr>
    </table> -->
    <!-- <div v-if="albums">

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Release Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(album, index) in albums" :key="index">
            <td>{{ album?.key }}</td>
            <td>{{ album?.name }}</td>
            <td>{{ album?.artists[0].name }}</td>
            <td>{{ album?.release_date }}</td>
           
          </tr>
        </tbody>
      </table>
    </div> -->

    <!-- <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Release Date</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(album, index) in albums" :key="index">
          <td>{{ album?.index }}</td>
          <td>
            <div> <img :src="album.images[0].url" alt="Album Cover"></div>
            <div>
              <div>{{ album?.name }}</div>
              <div>{{ album?.artists[0].name }}</div>
            </div>
          </td>
          <td>{{ album.release_date }}</td>
          <td>
            <router-link :to="{ name: 'album-tracks', params: { albumId: album.id } }">Ver Faixas</router-link>

          </td>
        </tr>
      </tbody>
    </table> -->
  </main>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'home',
  data() {
    return {
      searchTerm: '',
      clientId: '96a33de74f714569b7bd84d4da393733',
      clientSecret: '3161844f4d70487282c9f444fc02379c',
      albums: [],
      accessToken: ''
    }
  },
  methods: {
    async getAccessToken() {
      const auth_token = btoa(`${this.clientId}:${this.clientSecret}`);
      const token_url = 'https://accounts.spotify.com/api/token';
      const data = qs.stringify({ 'grant_type': 'client_credentials' });

      let body = {
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret
      }
      const response = await axios.post(token_url, data, {
        headers: {
          'Authorization': `Basic ${auth_token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      return response.data.access_token;
    },
    async searchAlbums() {
      const response = await axios.get(
        `https://api.spotify.com/v1/search`,
        {
          params: {
            q: this.searchTerm,
            type: 'album',
            limit: 10,
          },
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      this.albums = response.data.albums.items;
      console.log(this.albums)
      return response.data.albums.items;
    },
  },
  async created() {
    this.accessToken = await this.getAccessToken();
  }

}
</script>

<style lang="scss" scoped>
.icon-color {
  color: #FCFCFC;
}
main {
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.album-cover {
  height: 202px;
  width: 200px;
  margin-bottom: 16px;
  border-radius: 4px;
}

.albums-container {
  display: flex;
  overflow-x: scroll;
  gap: 24px;
  width: 80%;
}

.album-title {
  margin-bottom: 4px;
  font-family: 'Inter';
  color: #FCFCFC;
}

.search-container {
  border-radius: 12px;
  border: 1px solid var(--action-border, rgba(235, 235, 255, 0.05));
  background: #1F1F22;
  width: 480px;
  height: 40px;
  display: flex;
  align-items: center;

  input {
    border-radius: 12px 0 0 12px;
    padding: 8px;
    color: #FCFCFC;
    height: 100%;
    width: 90%;
    background: transparent;
    border: none;
  }

  button {
    width: 10%;
    height: 80%;
    background: transparent;
    border: none;
  }
}
</style>
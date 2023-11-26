<template>
  <div class="detail">
    <div class="track-container">
      <div class="current-track" v-if="current.isDefined == true">
        <img
          :src="current.items.album.images[0].url"
          alt="Current Track Album Cover"
          class="album-cover"
        />
        <div class="current-track-info">
          <p>{{ current.items.name }}</p>
          <p>
            <span>
              {{
                current.items.artists
                  .slice(0, 4)
                  .map((artist) => artist.name)
                  .join(", ")
              }}
            </span>
            <span v-if="current.items.artists.length > 2" class="artists-name"
              >e mais</span
            >
          </p>
        </div>

        <a :href="current.items.external_urls.spotify" target="_blank"
          >Ver no Spotify</a
        >
      </div>
      <p v-else>Selecione uma música</p>
    </div>
    <div class="album-container" v-if="album">
      <img :src="album.images[0].url" alt="Album Cover" class="album-cover" />
      <div class="album-info-container">
        <h5>Album</h5>
        <h2>{{ album.name }}</h2>
        <div class="artists-name">
          <span class="artists-name">
            {{ formatDate(album?.release_date) }}
          </span>
          <span> • </span>
          <span>
            {{
              album.artists
                .slice(0, 4)
                .map((artist) => artist.name)
                .join(", ")
            }}
          </span>
          <span v-if="album.artists.length > 2" class="artists-name"
            >e mais</span
          >
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>Título</td>
          <td>Artista</td>
          <td>
            <font-awesome-icon
              icon="fa-regular fa-clock"
              style="color: #ffffff"
            />
          </td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(track, index) in tracks"
          :key="index"
          @click="updateCurrent(track)"
        >
          <td>{{ track.track_number }}</td>
          <td>{{ track.name }}</td>
          <td>
            {{
              track.artists
                .slice(0, 4)
                .map((artist) => artist.name)
                .join(", ")
            }}
            <span v-if="track.artists.length > 2" class="artists-name"
              >e mais</span
            >
          </td>
          <td>{{ formatTime(track.duration_ms) }}</td>
          <td>
            <a :href="track.external_urls.spotify" target="_blank" class="more"
              >Ver mais</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import SpotifyApiService from "@/services/SpotifyApiService";
import { formatDate, formatTime } from "@/utils/dateUtils";

export default {
  name: "home",
  data() {
    return {
      tracks: [],
      album: null,
      albumId: "",
      current: {
        items: {},
        isDefined: false,
      },
    };
  },
  methods: {
    formatDate,
    formatTime,
    async updateCurrent(track) {
      this.current.items = await SpotifyApiService.getTrack(track.id);
      this.current.isDefined = true;
      console.log(this.current);
    },
  },
  async created() {
    this.albumId = this.$route.params.id;
    this.album = await SpotifyApiService.getAlbum(this.albumId);
    this.tracks = await SpotifyApiService.getAlbumTracks(this.albumId);
  },
};
</script>
<style lang="scss" scoped>
@media (min-width: 1024px) {
  .detail {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 93px;
    background: linear-gradient(
      180deg,
      #191919 53.09%,
      rgba(0, 0, 0, 0.6) 100%
    );
    padding-bottom: 48px;
  }
}
.album-container {
  display: flex;
  gap: 24px;
  padding: 32px 24px 24px 32px;
  align-items: center;
  background: linear-gradient(180deg, #393936 0%, rgba(57, 57, 50, 0.42) 100%);
  width: 100%;
}

.album-cover {
  height: 232px;
  width: 232px;
  margin-bottom: 16px;
  box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
}
tr {
  border-bottom: 1px solid #2e2e2c;
}
.album-info-container {
  h5 {
    font-size: 14px;
    color: #fff;
    font-family: Gothic A1;
    font-weight: 700;
  }
  h2 {
    font-size: 96px;
    font-family: "Gothic A1";
    color: #fff;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
  }
  .artists-name {
    span {
      color: #bebebd;
      font-family: Gothic A1;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 21px; /* 150% */
    }
  }
}
table {
  width: 60%;
}
table {
  border-spacing: 0; /* Define a distância entre as bordas das células como 0 */
}
thead tr td {
  margin: 0px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
}
tbody tr:hover {
  background: hsla(0, 0%, 100%, 0.1);

  td:first-child {
    border-radius: 4px 0 0 4px;
  }
  td:last-child {
    border-radius: 0 4px 4px 0;
  }
}

td {
  padding: 16px;
  color: #fff;
}

.more {
  text-decoration: none;
  color: var(--fg-subtle, #9898a6);
  text-transform: uppercase;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  &:hover {
    color: #1ed760;
  }
}

.track-container {
  width: 100%;
  display: flex;
  height: 93px;
  background-color: #181818;
  padding: 20px 32px 12px;
  position: fixed;
  top: 0;
  left: 0;
  p {
    margin: auto;
    color: #fafafa;
    text-transform: uppercase;
  }
  .current-track {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 28px;
    justify-content: center;
    align-items: center;
    a {
      align-self: center;
      justify-self: space-between;
      color: #fafafa;
      margin: 0 0 0 auto;
      text-decoration: none;
      &:hover {
        color: #1ed760;
      }
    }
    img {
      width: 60px;
      height: 100%;
    }
    &-info {
      p {
        text-transform: capitalize;
        color: #fafafa;
      }
    }
  }
}
</style>

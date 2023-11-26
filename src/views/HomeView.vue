<template>
  <main>
    <div class="container">
      <div class="search-container">
        <input
          v-model="searchTerm"
          placeholder="Digite o termo de busca"
          @keyup.enter="onSearch"
        />
        <button @click="onSearch">
          <font-awesome-icon
            :icon="['fas', 'magnifying-glass']"
            class="icon-color"
          />
        </button>
      </div>
      {{ albums.length }}
    </div>
    <div class="albums-container">
      <router-link
        :to="{ path: `/album/${album.id}` }"
        class="album-card"
        v-for="(album, index) in albums"
        :key="index"
      >
        <div class="mb-8px">
          <div>
            <img
              :src="album.images[0].url"
              alt="Album Cover"
              class="album-cover"
            />
            <h3 class="album-title">{{ album?.name }}</h3>
          </div>
          <div>
            <div>
              <p class="artists-name line-break">
                <span class="artists-name">
                  {{ formatDate(album?.release_date) }}
                </span>
                <span class=""> • </span>
                {{
                  album.artists
                    .slice(0, 4)
                    .map((artist) => artist.name)
                    .join(", ")
                }}
                <span v-if="album.artists.length > 2" class="artists-name"
                  >e mais</span
                >
              </p>
            </div>
          </div>
        </div>
        <router-link class="detail" :to="{ path: `/album/${album.id}` }"
          >Ver mais</router-link
        >
      </router-link>
    </div>
  </main>
</template>

<script>
import SpotifyApiService from "@/services/SpotifyApiService";
import {formatDate} from "@/utils/dateUtils";

export default {
  name: "HomePage",
  data() {
    return {
      searchTerm: "",
      albums: [],
    };
  },
  methods: {
    formatDate,
    async onSearch() {
      this.albums = await SpotifyApiService.searchAlbums(this.searchTerm);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-color {
  color: #fcfcfc;
  &:hover {
    color: #1ed760;
  }
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
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
  min-height: 400px;
  padding: 24px;
}
::-webkit-scrollbar {
  height: 18px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #777;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
.album-title {
  font-family: "Inter";
  color: #fcfcfc;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.artists-name {
  color: var(--fg-default-065, rgba(252, 252, 252, 0.65));
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
}

.line-break {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Número desejado de linhas a serem exibidas */
  -webkit-box-orient: vertical;
  white-space: normal;
}

.search-container {
  border-radius: 12px;
  border: 1px solid var(--action-border, rgba(235, 235, 255, 0.05));
  background: #1f1f22;
  width: 480px;
  height: 40px;
  display: flex;
  align-items: center;
  &:focus {
    border-color: #1ed760 !important;
    outline: 1px solid #1ed760;
    box-shadow: 0 0 8px #1ed760;
  }
  input {
    border-radius: 12px 0 0 12px;
    padding: 8px;
    color: #fcfcfc;
    height: 100%;
    width: 90%;
    background: transparent;
    border: none;
    &:focus {
      border-color: #1ed760 !important;
      outline: 1px solid #1ed760;
      box-shadow: 0 0 4px #1ed760;
    }
  }

  button {
    width: 10%;
    height: 80%;
    background: transparent;
    border: none;
  }
}

.detail {
  color: var(--fg-subtle, #9898a6);
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  text-transform: uppercase;
  text-decoration: none;
  &:hover {
    color: #1ed760;
  }
}

.album-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #181818;
  padding: 16px;
  justify-content: space-between;
  text-decoration: none !important;
  &:hover {
    background: #282828;
  }
}

.mb-8px {
  margin-bottom: 8px;
}
</style>

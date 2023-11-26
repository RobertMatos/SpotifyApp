import axios from "axios";
import qs from "qs";

const clientId = "96a33de74f714569b7bd84d4da393733";
const clientSecret = "3161844f4d70487282c9f444fc02379c";
const urlApi = "https://api.spotify.com/v1";
const urlAccounts = "https://accounts.spotify.com/api";

const SpotifyApiService = {
  async getAccessToken() {
    const auth_token = btoa(`${clientId}:${clientSecret}`);
    const token_url = `${urlAccounts}/token`;
    const data = qs.stringify({ grant_type: "client_credentials" });

    const response = await axios.post(token_url, data, {
      headers: {
        Authorization: `Basic ${auth_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.access_token;
  },

  async searchAlbums(searchTerm) {
    const accessToken = await this.getAccessToken();

    const response = await axios.get(`${urlApi}/search`, {
      params: {
        q: searchTerm,
        type: "album",
        limit: 10,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.albums.items;
  },

  async getAlbum(albumId) {
    const accessToken = await this.getAccessToken();

    const response = await axios.get(`${urlApi}/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  },
  async getAlbumTracks(albumId) {
    const accessToken = await this.getAccessToken();

    const response = await axios.get(`${urlApi}/albums/${albumId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.items;
  },
  async getTrack(trackId) {
    const accessToken = await this.getAccessToken();

    const response = await axios.get(`${urlApi}/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  },
};

export default SpotifyApiService;

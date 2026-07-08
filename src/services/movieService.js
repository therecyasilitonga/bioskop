/**
 * src/services/movieService.js
 * -----------------------------------------------------------------------
 * Layanan pemrosesan katalog film.
 * -----------------------------------------------------------------------
 */

import { dummyMovies } from '../data/dummyMovies';
import apiClient from './apiClient';

export const movieService = {
  getNowShowing: async () => {
    // const res = await apiClient.get('/movies/now-showing');
    // return res.data;
    
    await new Promise((resolve) => setTimeout(resolve, 300));
    return dummyMovies.filter(m => m.status === 'NOW_SHOWING');
  },

  getComingSoon: async () => {
    // const res = await apiClient.get('/movies/coming-soon');
    // return res.data;

    await new Promise((resolve) => setTimeout(resolve, 300));
    return dummyMovies.filter(m => m.status === 'COMING_SOON');
  },

  searchMovies: async (query) => {
    // const res = await apiClient.get(`/movies/search?q=${encodeURIComponent(query)}`);
    // return res.data;

    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!query) return dummyMovies;
    return dummyMovies.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.genre.toLowerCase().includes(query.toLowerCase())
    );
  },

  getMovieDetail: async (id) => {
    // const res = await apiClient.get(`/movies/${id}`);
    // return res.data;

    await new Promise((resolve) => setTimeout(resolve, 300));
    const movie = dummyMovies.find(m => m.id === id);
    if (!movie) throw new Error('Film tidak ditemukan');
    return movie;
  }
};

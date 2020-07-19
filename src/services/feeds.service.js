import axios from 'axios'
import { databaseURL } from '../firebase/firebase.utils';

const NEWS_API = '/v0/item/'

export const getFeeds = (feed) => (
  axios.get(`${databaseURL}${NEWS_API}/${feed}.json`)
)
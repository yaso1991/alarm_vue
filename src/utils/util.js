import axios from 'axios'
export default {
  cardReaders:[],
  async loadCardReadersData () {
    if(this.cardReaders.length >0) {
      return this.cardReaders;
    }
    await axios({
      method: 'get',
      url: '/alarmInfo/loadCardReadersData'
    }).then(resp => {
      if (resp && resp.status == 200) {
        this.cardReaders = resp.data
      }
    });
    return this.cardReaders;
  },
}

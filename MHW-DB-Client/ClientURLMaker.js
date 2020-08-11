/**
 * @class URLMaker A class for generalizing search params to hit mhw-db endpoint
 * @description example usage: const data = await (new URLClass.URLMaker('p', { name: true, skills: true}, 'armor')).JSON
 */
class ClientURLMaker {
  /**
   * 
   * @param {string} searchMode A string, either p or q, to search endpoint
   * @param {Object} searchParams An object with search params (ex: "name":true),
   * operators from mhw-db supported: ex: 
   * const likeOpQuery = {$like: 'Leather'}
   * const searchParams = {name: likeOpQuery}
   * @param {string} path A string, db directory to search through on mhw-db
   */
  constructor (searchMode, searchParams, path) {
    this.url = 'https://mhw-db.com/'
    this.searchMode = searchMode
    this.searchParams = searchParams
    this.path = path
    this.urlConcat = new URL(this.url + path)
    this.urlConcat.searchParams.set(searchMode, JSON.stringify(searchParams))
  }
  /**
   * @returns JSON data from URL search query
   */
  get JSON() {
    return fetch(this.urlConcat)
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.log(`${err}... something went wrong.`))
  }
  /**
   * @returns complete URL
   */
  get completeURL() {
    return this.urlConcat
  }
}
import {reader} from './reader';


class Style {
  /**
   * Read xml file
   * @param  {string} sld xml string
   * @param {string} [layername] Select layer matching layername, defaults to first layer
   * @return {void}
   */
  read(sld) {
    this.sld = reader(sld);
  }


  /**
   * get sld rules for feature
   * @param  {Object} properties feature properties
   * @return {Rule} filtered sld rules
   */
  getRule(properties) {
    return {};
  }
}


export {Style};

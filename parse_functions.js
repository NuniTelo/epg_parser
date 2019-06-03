/**
* Generate a programe list
* @return information for programmes
*/
exports.generate_programme_list = async (channel_body) => {
   
   let programme_list = []
   // get programme information
   channel_body.forEach(programme => {
       programme_list.push({
           start: programme.$.start,
           stop: programme.$.stop,
           channel_name: programme.$.channel,
           title: programme.title[0]._,
           subtitle: programme['sub-title'][0]._,
           category: programme.category[0]._,
           rating_system: programme.rating[0].$.system,
           value: programme.rating[0].value
       })
   })
   return programme_list
}

/**
* Pass the body of the XML Programme List 
* @return a list of programmes
*/
exports.generate_channel_list = async (programme_list) => {
   let programme = []
   //get channel information 
   programme_list.forEach(channel => {
       programme.push({
           id: channel.$.id,
           display_name: channel['display-name'][0]._
       })
   })
   return programme
}
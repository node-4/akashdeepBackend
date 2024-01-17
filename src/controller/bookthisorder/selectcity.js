const cityModel = require('../../model/bookthisorder/selectcity');

exports.createCity = async (req, res) => {
  try {
    const { selectcity, type, state, country, countryType } = req.body;
    if (type == "city") {
      const newCity = await cityModel.create({ selectcity, type, state, country });
      return res.status(201).json({ message: "city created", newCity });
    }
    if (type == "state") {
      const newCity = await cityModel.create({ selectcity, type, country });
      return res.status(201).json({ message: "State created", newCity });
    }
    if (type == "country") {
      const newCity = await cityModel.create({ selectcity, type, countryType });
      return res.status(201).json({ message: "City created", newCity });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
// exports.createCity = async (req, res) => {
//   try {
//     let x = [
//       { "selectcity": "Afghanistan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Albania", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Algeria", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Andorra", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Angola", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Antigua and Barbuda", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Argentina", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Armenia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Australia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Austria", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Austrian Empire*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Azerbaijan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Baden*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Bahamas, The", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Bahrain", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Bangladesh", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Barbados", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Bavaria*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Belarus", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Belgium", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Belize", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Benin (Dahomey)", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Bolivia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Bosnia and Herzegovina", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Botswana", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Brazil", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Brunei", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Brunswick and Lüneburg*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Bulgaria", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Burkina Faso (Upper Volta)", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Burma", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Burundi", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Cabo Verde", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Cambodia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Cameroon", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Canada", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Cayman Islands, The", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Central African Republic", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Central American Federation*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Chad", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Chile", "type": "country", "countryType": "overseas" },
//       { "selectcity": "China", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Colombia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Comoros", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Congo Free State, The*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Costa Rica", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Cote d’Ivoire (Ivory Coast)", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Croatia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Cuba", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Cyprus", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Czechia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Czechoslovakia*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Democratic Republic of the Congo", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Denmark", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Djibouti", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Dominica", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Dominican Republic", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Duchy of Parma, The*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "East Germany (German Democratic Republic)*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Ecuador", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Egypt", "type": "country", "countryType": "overseas" },
//       { "selectcity": "El Salvador", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Equatorial Guinea", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Eritrea", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Estonia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Eswatini", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Ethiopia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Federal Government of Germany (1848-49)*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Fiji", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Finland", "type": "country", "countryType": "overseas" },
//       { "selectcity": "France", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Gabon", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Gambia, The", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Georgia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Germany", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Ghana", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Grand Duchy of Tuscany, The*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Greece", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Grenada", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Guatemala", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Guinea", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Guinea-Bissau", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Guyana", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Haiti", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Hanover*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Hanseatic Republics*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Hawaii*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Hesse*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Holy See", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Honduras", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Hungary", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Iceland", "type": "country", "countryType": "overseas" },
//       { "selectcity": "India", "type": "country", "countryType": "other" },
//       { "selectcity": "Indonesia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Iran", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Iraq", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Ireland", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Israel", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Italy", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Jamaica", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Japan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Jordan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Kazakhstan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Kenya", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Kingdom of Serbia/Yugoslavia*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Kiribati", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Korea", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Kosovo", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Kuwait", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Kyrgyzstan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Laos", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Latvia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Lebanon", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Lesotho", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Lew Chew (Loochoo)*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Liberia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Libya", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Liechtenstein", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Lithuania", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Luxembourg", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Madagascar", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Malawi", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Malaysia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Maldives", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Mali", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Malta", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Marshall Islands", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Mauritania", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Mauritius", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Mecklenburg-Schwerin*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Mecklenburg-Strelitz*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Mexico", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Micronesia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Moldova", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Monaco", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Mongolia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Montenegro", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Morocco", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Mozambique", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Namibia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Nassau*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Nauru", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Nepal", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Netherlands, The", "type": "country", "countryType": "overseas" },
//       { "selectcity": "New Zealand", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Nicaragua", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Niger", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Nigeria", "type": "country", "countryType": "overseas" },
//       { "selectcity": "North German Confederation*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "North German Union*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "North Macedonia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Norway", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Oldenburg*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Oman", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Orange Free State*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Pakistan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Palau", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Panama", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Papal States*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Papua New Guinea", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Paraguay", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Peru", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Philippines", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Piedmont-Sardinia*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Poland", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Portugal", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Qatar", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Republic of Genoa*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Republic of Korea (South Korea)", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Republic of the Congo", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Romania", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Russia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Rwanda", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Saint Kitts and Nevis", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Saint Lucia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Saint Vincent and the Grenadines", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Samoa", "type": "country", "countryType": "overseas" },
//       { "selectcity": "San Marino", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Sao Tome and Principe", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Saudi Arabia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Schaumburg-Lippe*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Senegal", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Serbia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Seychelles", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Sierra Leone", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Singapore", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Slovakia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Slovenia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Solomon Islands, The", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Somalia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "South Africa", "type": "country", "countryType": "overseas" },
//       { "selectcity": "South Sudan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Spain", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Sri Lanka", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Sudan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Suriname", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Sweden", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Switzerland", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Syria", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Tajikistan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Tanzania", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Texas*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Thailand", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Timor-Leste", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Togo", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Tonga", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Trinidad and Tobago", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Tunisia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Turkey", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Turkmenistan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Tuvalu", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Two Sicilies*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Uganda", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Ukraine", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Union of Soviet Socialist Republics*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "United Arab Emirates, The", "type": "country", "countryType": "overseas" },
//       { "selectcity": "United Kingdom, The", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Uruguay", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Uzbekistan", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Vanuatu", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Venezuela", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Vietnam", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Württemberg*", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Yemen", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Zambia", "type": "country", "countryType": "overseas" },
//       { "selectcity": "Zimbabwe", "type": "country", "countryType": "overseas" }
//     ];
//     for (let i = 0; i < x.length; i++) {
//       const newCity = await cityModel.create(x[i]);
//     }
//     return res.status(201).json({ message: "City created", });
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// };
exports.getCity = async (req, res) => {
  try {
    if (req.query.state != (null || undefined)) {
      const cities = await cityModel.find({ state: req.query.state, type: "city" });
      if (!cities) {
        return res.status(400).json({ error: "cities data not provided" });
      }
      return res.status(201).json({ success: true, data: cities })
    } else {
      const cities = await cityModel.find({ type: "city" });
      if (!cities) {
        return res.status(400).json({ error: "cities data not provided" });
      }
      return res.status(201).json({ success: true, data: cities })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getState = async (req, res) => {
  try {
    if (req.query.country != (null || undefined)) {
      const cities = await cityModel.find({ country: req.query.country, type: "state", });
      if (!cities) {
        return res.status(400).json({ error: "cities data not provided" });
      }
      return res.status(201).json({ success: true, data: cities })
    } else {
      const cities = await cityModel.find({ country: req.query.country, type: "state", });
      if (!cities) {
        return res.status(400).json({ error: "cities data not provided" });
      }
      return res.status(201).json({ success: true, data: cities })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getOtherCountry = async (req, res) => {
  try {
    const cities = await cityModel.find({ type: "country", countryType: "other" });
    if (!cities) {
      return res.status(400).json({ error: "cities data not provided" });
    }
    return res.status(201).json({ success: true, data: cities })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getOverseasCountry = async (req, res) => {
  try {
    const cities = await cityModel.find({ type: "country", countryType: "overseas" });
    if (!cities) {
      return res.status(400).json({ error: "cities data not provided" });
    }
    return res.status(201).json({ success: true, data: cities })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getCityforDelhiNcr = async (req, res) => {
  try {
    const cities = await cityModel.findOne({ selectcity: "Delhi/NCR", type: "city" });
    if (!cities) {
      return res.status(400).json({ error: "cities data not provided" });
    }
    return res.status(201).json({ success: true, data: cities })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getCitybyType = async (req, res) => {
  try {
    const cities = await cityModel.find({ type: req.params.type });
    if (!cities) {
      return res.status(400).json({ error: "cities data not provided" });
    }
    return res.status(201).json({ success: true, data: cities })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { selectcity } = req.body;
    const updatedCity = await cityModel.findByIdAndUpdate(id, { selectcity }, { new: true });
    return res.status(201).json({ success: true, data: updatedCity })
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    await cityModel.findByIdAndDelete(id);
    res.json({ message: 'City deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

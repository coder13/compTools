module.exports = class WCIF {
  constructor(json) {
    this.formatVersion = json.formatVersion;
    this.id = json.id;
    this.name = json.name;
    this.shortName = json.shortName;
    this.persons = json.persons;
    this.events = json.events;
    this.scheudle = json.scheudle;
    this.competitorLimit = json.competitorLimit;
    this.extensions = json.extensions;
  }
};

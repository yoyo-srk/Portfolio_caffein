import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Array "mo:core/Array";

actor {
  module Project {
    public type Category = {
      #Frontend;
      #Backend;
      #FullStack;
      #Mobile;
    };

    public type Tech = {
      name : Text;
    };

    public type Project = {
      title : Text;
      description : Text;
      techStack : [Tech];
      liveUrl : Text;
      githubUrl : Text;
      category : Category;
      imageUrl : Text;
    };

    public func compare(project1 : Project, project2 : Project) : Order.Order {
      switch (Text.compare(project1.title, project2.title)) {
        case (#equal) { Text.compare(project1.description, project2.description) };
        case (order) { order };
      };
    };
  };

  module Experience {
    public type Experience = {
      role : Text;
      company : Text;
      startDate : Time.Time;
      endDate : ?Time.Time;
      description : Text;
      isCurrent : Bool;
    };

    public func compare(experience1 : Experience, experience2 : Experience) : Order.Order {
      switch (Text.compare(experience1.role, experience2.role)) {
        case (#equal) { Text.compare(experience1.company, experience2.company) };
        case (order) { order };
      };
    };
  };

  module Skill {
    public type Category = {
      #Frontend;
      #Backend;
      #DevOps;
      #DataScience;
    };

    public type Skill = {
      name : Text;
      category : Category;
      proficiency : Nat; // 1-10 scale
    };

    public func compare(skill1 : Skill, skill2 : Skill) : Order.Order {
      switch (Text.compare(skill1.name, skill2.name)) {
        case (#equal) {
          if (skill1.proficiency == skill2.proficiency) {
            #equal;
          } else if (skill1.proficiency < skill2.proficiency) {
            #less;
          } else {
            #greater;
          };
        };
        case (order) { order };
      };
    };
  };

  module About {
    public type About = {
      bio : Text;
      yearsExperience : Nat;
      projectsCount : Nat;
      clientsCount : Nat;
    };
  };

  module Contact {
    public type Contact = {
      name : Text;
      email : Text;
      subject : Text;
      message : Text;
      timestamp : Time.Time;
    };

    public func compare(contact1 : Contact, contact2 : Contact) : Order.Order {
      switch (Text.compare(contact1.name, contact2.name)) {
        case (#equal) {
          switch (Text.compare(contact1.email, contact2.email)) {
            case (#equal) { Int.compare(contact1.timestamp, contact2.timestamp) };
            case (order) { order };
          };
        };
        case (order) { order };
      };
    };
  };

  let projects = Map.empty<Text, Project.Project>();
  let experiences = Map.empty<Text, Experience.Experience>();
  let skills = Map.empty<Text, Skill.Skill>();
  let contacts = Map.empty<Nat, Contact.Contact>();

  var about : About.About = {
    bio = "Full Stack Developer with a passion for building scalable web applications.";
    yearsExperience = 7;
    projectsCount = 15;
    clientsCount = 5;
  };

  public query ({ caller }) func getProjects() : async [Project.Project] {
    projects.values().toArray().sort();
  };

  public query ({ caller }) func getExperience() : async [Experience.Experience] {
    experiences.values().toArray().sort();
  };

  public query ({ caller }) func getSkills() : async [Skill.Skill] {
    skills.values().toArray().sort();
  };

  public query ({ caller }) func getAbout() : async About.About {
    about;
  };

  public shared ({ caller }) func submitContact(name : Text, email : Text, subject : Text, message : Text) : async () {
    let timestamp = Time.now();
    let contact : Contact.Contact = {
      name;
      email;
      subject;
      message;
      timestamp;
    };
    contacts.add(timestamp.toNat(), contact);
  };

  public shared ({ caller }) func updateAbout(bio : Text, yearsExperience : Nat, projectsCount : Nat, clientsCount : Nat) : async () {
    about := {
      bio;
      yearsExperience;
      projectsCount;
      clientsCount;
    };
  };

  public shared ({ caller }) func addProject(title : Text, description : Text, techStack : [Project.Tech], liveUrl : Text, githubUrl : Text, category : Project.Category, imageUrl : Text) : async () {
    if (title.trim(#char ' ').size() == 0) {
      Runtime.trap("Project must have a title.");
    };

    let project : Project.Project = {
      title;
      description;
      techStack;
      liveUrl;
      githubUrl;
      category;
      imageUrl;
    };

    projects.add(title, project);
  };

  public shared ({ caller }) func addExperience(role : Text, company : Text, startDate : Time.Time, endDate : ?Time.Time, description : Text, isCurrent : Bool) : async () {
    if (role.trim(#char ' ').size() == 0 or company.trim(#char ' ').size() == 0) {
      Runtime.trap("Role and company must not be empty.");
    };

    let experience : Experience.Experience = {
      role;
      company;
      startDate;
      endDate;
      description;
      isCurrent;
    };

    experiences.add(role, experience);
  };

  public shared ({ caller }) func addSkill(name : Text, category : Skill.Category, proficiency : Nat) : async () {
    if (name.trim(#char ' ').size() == 0 or proficiency < 1 or proficiency > 10) {
      Runtime.trap("Skill must have a name and valid proficiency. Proficiency must be between 1 and 10.");
    };

    let skill : Skill.Skill = {
      name;
      category;
      proficiency;
    };

    skills.add(name, skill);
  };

  public shared ({ caller }) func removeProject(title : Text) : async () {
    switch (projects.get(title)) {
      case (null) { Runtime.trap("Project must exist.") };
      case (?_) {
        projects.remove(title);
        ();
      };
    };
  };

  public shared ({ caller }) func removeExperience(role : Text) : async () {
    switch (experiences.get(role)) {
      case (null) { Runtime.trap("Experience must exist.") };
      case (?_) {
        experiences.remove(role);
        ();
      };
    };
  };

  public shared ({ caller }) func removeSkill(name : Text) : async () {
    switch (skills.get(name)) {
      case (null) { Runtime.trap("Skill must exist.") };
      case (?_) {
        skills.remove(name);
        ();
      };
    };
  };

  public query ({ caller }) func getAllContacts() : async [Contact.Contact] {
    contacts.values().toArray().sort();
  };
};

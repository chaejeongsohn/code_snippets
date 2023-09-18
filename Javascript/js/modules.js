// Modules
import playGuitar from "./module-guitars.js";
import {shredding as shred, plucking as finger} from "./module-guitars.js";
import User from "./module-user.js";

console.log(playGuitar());
console.log(shred());
console.log(finger());

const me = new User("email@email.com", "Sohn");
console.log(me)
console.log(me.greeting());
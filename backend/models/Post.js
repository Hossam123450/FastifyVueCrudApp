import SequelizePkg from 'sequelize'; // importe tout le package comme default
const { DataTypes } = SequelizePkg;   // extrait DataTypes du package
import sequelize from '../sequelize.js'; // adapte le chemin

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  content: DataTypes.TEXT
}, {
  tableName: 'posts',
  timestamps: false  // <-- désactive les colonnes automatiques
});


export default Post;

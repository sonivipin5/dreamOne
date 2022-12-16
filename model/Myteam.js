import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const myTeam = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User',
    },


    pid: { type: Number },
    title: { type: String, },
    short_name: { type: String, },
    first_name: { type: String, },
    last_name: { type: String, },
    middle_name: { type: String },
    birthdate: { type: Date, },
    birthplace: { type: Date },
    country: { type: String },
    primary_team: { type: [] },
    thumb_url: { type: Date },
    logo_url: { type: Date },
    playing_role: { type: Date },
    batting_style: { type: Date },
    bowling_style: { type: Date },
    fielding_position: { type: Date },
    recent_match: { type: Number },
    recent_appearance: { type: Number },
    fantasy_player_rating: { type: Number },
    t: { type: Number },
    nationality: { type: Date }



}, { timestamps: true })

mongoose.models = {};

const Note = mongoose.model('Team', myTeam)

export default Note
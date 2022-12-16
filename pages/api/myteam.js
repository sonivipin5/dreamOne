import connectDB from "../../db";
import Team from "../../model/Myteam";
import jwt from "jsonwebtoken";
import User from "../../model/user";

const handler = async (req, res) => {
    const { pid,
        title,
        short_name,
        first_name,
        last_name,
        middle_name,
        birthdate,
        birthplace,
        country,
        primary_team,
        thumb_url,
        logo_url,
        playing_role,
        batting_style,
        bowling_style,
        fielding_position,
        recent_match,
        recent_appearance,
        fantasy_player_rating,
        t,
        nationality} = req.body;
    if (req.method == "POST") {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // get token form headers
                token = req.headers.authorization.split(" ")[1];

                // verify auth

                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                // Get user form the token

                const user = await User.findById(decoded.id).select("-password");

                const note = await Team.create({
                    user: user.id,
                    pid,
                    title,
                    short_name,
                    first_name,
                    last_name,
                    middle_name,
                    birthdate,
                    birthplace,
                    country,
                    primary_team,
                    thumb_url,
                    logo_url,
                    playing_role,
                    batting_style,
                    bowling_style,
                    fielding_position,
                    recent_match,
                    recent_appearance,
                    fantasy_player_rating,
                    t,
                    nationality
                })

                res.status(200).json({
                    title: note.title,
                    desc: note.desc,
                    tag: note.tag
                })
            } catch (error) {
                console.log(error);
                res.status(401).send("Not Authorized");
            }
        }
        if (!token) {
            res.status(401).send("Not Authorized, No Token");
        }
    }
};

export default connectDB(handler);

// import User from '../models/user.model.js';
// import bcrypt from "bcryptjs";
// import generateTokenAndSetCookie from "../utils/generateToken.js";

// export const signupUser = async (req, res) => {
//     try{
//         const { fullName, username, password, confirmPassword, gender } = req.body;

//         if (password !== confirmPassword) {
// 			return res.status(400).json({ error: "Passwords don't match" });
// 		}

//         const user = await User.findOne({ username });

//         if (user) {
// 			return res.status(400).json({ error: "Username already exists" });
// 		}

//         //hashing password using bcrypt
//         const salt = await bcrypt.genSalt(10);
// 		const hashedPassword = await bcrypt.hash(password, salt);

//         //for profile image
//         const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
// 		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

//         const newUser = new User({
// 			fullName,
// 			username,
// 			password: hashedPassword,
// 			gender,
// 			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
// 		});

//         if (newUser) {
// 			// Generate JWT token
// 			generateTokenAndSetCookie(newUser._id, res);
// 			await newUser.save();

// 			res.status(201).json({
// 				_id: newUser._id,
// 				fullName: newUser.fullName,
// 				username: newUser.username,
// 				profilePic: newUser.profilePic,
// 			});
// 		} else {
// 			res.status(400).json({ error: "Invalid user data" });
// 		}


//     }catch(e){
//         console.log("Error in signup controller", e.message);
//         res.status(500).json({ e: "Internal Server Error" });
//     }
// }

// export const loginUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;
// 		const user = await User.findOne({ username });
// 		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

// 		if (!user || !isPasswordCorrect) {
// 			return res.status(400).json({ error: "Invalid username or password" });
// 		}

// 		const mfaCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit MFA code
//         console.log(`MFA Code: ${mfaCode}`);

// 		generateTokenAndSetCookie(user._id, res);

// 		res.status(200).json({
// 			_id: user._id,
// 			fullName: user.fullName,
// 			username: user.username,
// 			profilePic: user.profilePic,
// 			mfaCode
// 		});
//     } catch (error) {
//         console.log("Error in login controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// export const logoutUser =  (req, res) => {
//     try {
// 		res.cookie("jwt", "", { maxAge: 0 });
// 		res.status(200).json({ message: "Logged out successfully" });
// 	} catch (error) {
// 		console.log("Error in logout controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// }

// export const resetPassword =  async (req, res) => {
//     try {
// 		const { username } = req.body;
// 		const user = await User.findOne({ username });

// 		if (!user) {
//             return res.status(404).json({ error: "User does not exist" });
//         }

// 		// For now, just returning a success message for demonstration
//         res.status(200).json({ message: "Reset link sent to your email" });
// 		console.log("user id:",user.id);

// 	} catch (error) {
// 		console.log("Error in reset controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// }

// export const resetNewPassword = async (req, res) => {
//     try {
//         const { key, newPassword } = req.body;
//         console.log("Received key:", key);
//         console.log("Received newPassword:", newPassword);
        
//         const user = await User.findOne({ _id: key });

//         if (!user) {
//             console.log("User not found for key:", key);
//             return res.status(404).json({ error: "User does not exist" });
//         }

//         // Hash the new password using bcrypt
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(newPassword, salt);

//         // Update the user's password
//         user.password = hashedPassword;
//         await user.save();

//         return res.status(200).json({ message: "Password reset successfully" });
//     } catch (error) {
//         console.log("Error in reset controller", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }




import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import nodemailer from 'nodemailer';
 
export const signupUser = async (req, res) => {
    try{
        const { fullName, username, password, confirmPassword, gender } = req.body;
 
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
 
        const user = await User.findOne({ username });
 
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
 
        //hashing password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
 
        //for profile image
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
 
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });
 
        if (newUser) {
            // Generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
 
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
 
 
    }catch(e){
        console.log("Error in signup controller", e.message);
        res.status(500).json({ e: "Internal Server Error" });
    }
}
 
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
 
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
 
        const mfaCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit MFA code
        console.log(`MFA Code: ${mfaCode}`);
 
        // Send MFA code via email
        await sendEmail(user.username, mfaCode, "login");
 
        generateTokenAndSetCookie(user._id, res);
 
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            mfaCode
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
 
export const logoutUser =  (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
 
export const resetPassword =  async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
 
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }
 
        await sendEmail(user.username, user.id, "reset");
 
        // For now, just returning a success message for demonstration
        res.status(200).json({ message: "Reset link sent to your email" });
        console.log("user id:",user.id);
 
    } catch (error) {
        console.log("Error in reset controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
 
export const resetNewPassword = async (req, res) => {
    try {
        const { key, newPassword } = req.body;
        console.log("Received key:", key);
        console.log("Received newPassword:", newPassword);
       
        const user = await User.findOne({ _id: key });
 
        if (!user) {
            console.log("User not found for key:", key);
            return res.status(404).json({ error: "User does not exist" });
        }
 
        // Hash the new password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
 
        // Update the user's password
        user.password = hashedPassword;
        await user.save();
 
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.log("Error in reset controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
 
 
async function sendEmail(to, Code, type) {
    if (type === "login") {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vivetest00@gmail.com', // Replace with your email
                pass: 'mwpdvwwhylfybibi' // Replace with your email password
            }
        });
 
        let mailOptions = {
            from: 'vivetest00@gmail.com',
            to: to,
            subject: 'MFA Code',
            text: `Your MFA Code is: ${Code}`
        };
 
        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
 
    if (type === "reset") {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vivetest00@gmail.com', // Replace with your email
                pass: 'mwpdvwwhylfybibi' // Replace with your email password
            }
        });
 
        let mailOptions = {
            from: 'vivetest00@gmail.com',
            to: to,
            subject: 'Reset Password Code',
            text: `The Key for reseting your password: ${Code}`
        };
 
        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
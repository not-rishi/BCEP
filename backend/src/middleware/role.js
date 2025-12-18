// protecting routes by user role
// access mod routes for moderators only
// prevents mod-accounts to participate in events, login allows moderator to visit student dashboard to view how their event finally looks to the end user

exports.requireModerator = (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized - No User Data" });
  
  if (req.user.role !== "moderator") {
    console.log(`Access Denied: User is '${req.user.role}', but 'moderator' is required.`);
    return res.status(403).json({ msg: "Forbidden: You are not a Moderator" });
  }
  
  next();
};

exports.requireStudent = (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
  
  if (req.user.role !== "student") {
    return res.status(403).json({ msg: "Forbidden: Students Only" });
  }
  
  next();
};

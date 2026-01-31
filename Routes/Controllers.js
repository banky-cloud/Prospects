import Prospect from "../Models/Prospects.js"


export const addProspect = async (req, res) => {
  try {
    console.log(req.body)
    const { name, location, email } = req.body;

    const prospect = await Prospect.create({
      name,
      location,
      email,
    });

    res.status(200).json(prospect);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getProspects = async (req, res) => {
  const prospects = await Prospect.find().sort({ createdAt: -1 });
  res.status(200).json({success:true,result:prospects});
};


export const updateProspectStatus = async (req, res) => {
  try {
    const { id } = req.params;
  

    const prospect = await Prospect.findByIdAndUpdate(
      id,
      { $set:{status:"engaged"}},
      { new: true }
    );

    res.json(prospect);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const addProspectsFromCommaInput = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string") {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Split entries by comma
    const entries = input.split(",").map(e => e.trim());

    // Convert entries → objects
    const prospects = entries
      .map(entry => {
        const name = extract(entry, "name")||'Not Provided';
        const location = extract(entry, "location")|| "Not Provided";
        const email = extract(entry, "email");

        if (!name || !location || !email) return null;

        return { name, location, email };
      })
      .filter(Boolean);
      console.log(prospects);

    if (prospects.length === 0) {
      return res.status(400).json({ error: "No valid prospects found" });
    }

    // ONE database operation
    const result = await Prospect.insertMany(prospects, {
      ordered: false // continue on duplicate emails
    });

    res.status(201).json({
      message: "Prospects inserted",
      inserted: result.length,
      attempted: prospects.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* Helper */
function extract(text, field) {
  const regex = new RegExp(`${field}\\s*:\\s*([^,]+)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

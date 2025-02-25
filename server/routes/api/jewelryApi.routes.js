const router = require("express").Router();
const {
  Jewelry,
  Photo,
  Type,
  Collection,
  Metall,
  Stock,
  Size,
} = require("../../db/models");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const jewelry = await Jewelry.findOne({
      where: { id },
      include: [
        { model: Photo },
        { model: Type },
        { model: Collection },
        { model: Metall },
        { model: Stock, include: [{ model: Size }] },
      ],
    });
    if (jewelry) {
      res.json({ jewelry });
    } else {
      res.status(404).json({ message: "Украшение не найдено" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

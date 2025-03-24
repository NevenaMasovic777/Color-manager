import { Color } from "../models/color.model.js";

export const getColors = (req, res, next) => {
  Color.fetchAll((colors) => {
    return res.status(200).send(colors);
  });
};

export const addColor = (req, res, next) => {
  const name = req.body.name;
  const hex = req.body.hex;

  const color = new Color(null, name, hex);
  color.save();
  res.status(200).send(color);
};

export const updateColor = (req, res, next) => {
  const { id } = req.params;
  const updatedColor = new Color(id, req.body.name, req.body.hex);

  updatedColor.save();

  res.status(200).send(updatedColor);
};

export const deleteColor = (req, res, next) => {
  const { id } = req.params;
  Color.deleteById(id);
  res.status(200).send(id);
};

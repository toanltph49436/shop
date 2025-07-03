// server/controllers/iphoneController.js
import iPhone from '../models/iphoneModel.js';

export const getAlliPhones = async (req, res) => {
  try {
    const { model, color, storage, condition, isLocked, page = 1, limit = 10, sort } = req.query;

    const filter = {};

    if (model) filter.model = { $regex: model, $options: 'i' };
    if (color) filter.color = { $regex: color, $options: 'i' };
    if (storage) filter.storage = storage;
    if (condition) filter.condition = condition;
    if (isLocked !== undefined) filter.isLocked = isLocked === 'true';

    // Xử lý phân trang
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    // Xử lý sắp xếp
    let sortOption = {};
    if (sort === 'price_asc') sortOption.price = 1;
    else if (sort === 'price_desc') sortOption.price = -1;
    else if (sort === 'name_asc') sortOption.model = 1;
    else if (sort === 'name_desc') sortOption.model = -1;

    // Truy vấn
    const total = await iPhone.countDocuments(filter);
    const phones = await iPhone.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    res.json({
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      data: phones,
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi lọc/phân trang iPhone' });
  }
};


export const getiPhoneById = async (req, res) => {
  const phone = await iPhone.findById(req.params.id);
  phone ? res.json(phone) : res.status(404).json({ message: 'Not found' });
};

export const createiPhone = async (req, res) => {
  const newPhone = new iPhone(req.body);
  const savedPhone = await newPhone.save();
  res.status(201).json(savedPhone);
};

export const updateiPhone = async (req, res) => {
  const updatedPhone = await iPhone.findByIdAndUpdate(req.params.id, req.body, { new: true });
  updatedPhone ? res.json(updatedPhone) : res.status(404).json({ message: 'Not found' });
};

export const deleteiPhone = async (req, res) => {
  const deletedPhone = await iPhone.findByIdAndDelete(req.params.id);
  deletedPhone ? res.json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' });
};

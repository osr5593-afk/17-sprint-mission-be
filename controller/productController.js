const { create, assert } = require("superstruct");
const Product = require("../models/product");
const ObjectIdStruct = require("../structs/ObjectIdStruct");
const CreateProductRequestStruct = require("../structs/product/CreateProductRequestStruct");
const UpdateProductRequestStruct = require("../structs/product/UpdateProductRequestStruct");
const GetProductListRequestStruct = require("../structs/product/GetProductListRequestStruct");
const NotFoundException = require("../exceptions/NotFoundException");
const BadRequestException = require("../exceptions/BadRequestException");

// GET
const getProducts = async (req, res) => {
  const { page, pageSize, keyword } = create(
    req.query,
    GetProductListRequestStruct,
  );
  const filter = {};
  if (keyword && keyword.trim()) {
    const escaped = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [
      { name: { $regex: escaped, $options: "i" } },
      { description: { $regex: escaped, $options: "i" } },
    ];
  }
  const totalCount = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .select("name price createdAt")
    .sort({ createdAt: -1, _id: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  res.status(200).json({
    list: products,
    totalCount,
    pagination: {
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  });
};

// GET /products/:id
const getProduct = async (req, res) => {
  assert(req.params, ObjectIdStruct);
  const product = await Product.findById(req.params.id).select(
    "name description price tags createdAt",
  );
  if (!product) throw new NotFoundException("상품을 찾을 수 없습니다.");
  res.status(200).json(product);
};

// POST /products
const createProduct = async (req, res) => {
  const data = create(req.body, CreateProductRequestStruct);
  const product = await Product.create(data);
  res.status(201).json(product);
};

// PATCH /products/:id
const updateProduct = async (req, res) => {
  assert(req.params, ObjectIdStruct);
  const data = create(req.body, UpdateProductRequestStruct);
  if (Object.keys(data).length === 0)
    throw new BadRequestException("수정할 필드를 입력해 주세요.");
  const product = await Product.findById(req.params.id);
  if (!product) throw new NotFoundException("상품을 찾을 수 없습니다.");
  Object.assign(product, data);
  await product.save();
  res.status(200).json(product);
};

// DELETE /products/:id
const deleteProduct = async (req, res) => {
  assert(req.params, ObjectIdStruct);
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new NotFoundException("상품을 찾을 수 없습니다.");
  res.status(204).end();
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

import { Request, Response, NextFunction } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import LayoutModel from "../models/layout.model";
// create layout

export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await LayoutModel.findOne({ type });

      if (isTypeExist) {
        return next(new ErrorHandler(`This type ${type} is exist`, 400));
      }

      if (type === "banner") {
        const { image, title, subTitle } = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
          width: 150,
        });

        const banner = {
          image: { public: myCloud.public_id, url: myCloud.secure_url },
          title,
          subTitle,
        };

        await LayoutModel.create({ banner });
      }
      if (type === "faq") {
        const { faq } = req.body;

        const faqItems = await Promise.all(
          faq.map((item: any) => {
            return { question: item.question, answer: item.answer };
          })
        );

        await LayoutModel.create({ type, faq: faqItems });
      }

      if (type == "categories") {
        const { categories } = req.body;
        const categoriesItems = await Promise.all(
          categories.map((item: any) => {
            return { title: item.title };
          })
        );
        await LayoutModel.create({
          type: "categories",
          categories: categoriesItems,
        });
      }
      res.status(200).json({
        success: true,
        message: "Layout create successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// edit layout
export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      // const isTypeExist = await LayoutModel.findOne({ type });

      // if (isTypeExist) {
      //   return next(new ErrorHandler(`This type ${type} is exist`, 400));
      // }

      if (type === "banner") {
        const bannerData: any = await LayoutModel.findOne({ type: "banner" });
        const { image, title, subTitle } = req.body;

        if (bannerData) {
          await cloudinary.v2.uploader.destroy(bannerData?.banner.public_id);
        }

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
          width: 150,
        });

        const banner = {
          image: { public: myCloud.public_id, url: myCloud.secure_url },
          title,
          subTitle,
        };

        await LayoutModel.findByIdAndUpdate(bannerData._id, { banner });
      }
      if (type === "faq") {
        const { faq } = req.body;
        const faqData: any = await LayoutModel.findOne({ type: "faq" });
        if (faqData) {
          const faqItems = await Promise.all(
            faq.map((item: any) => {
              return { question: item.question, answer: item.answer };
            })
          );

          await LayoutModel.findByIdAndUpdate(faqData._id, { faq: faqItems });
        }
      }

      if (type == "categories") {
        const { categories } = req.body;
        const categoryData: any = await LayoutModel.findOne({
          type: "categories",
        });
        if (categoryData) {
          const categoriesItems = await Promise.all(
            categories.map((item: any) => {
              return { title: item.title };
            })
          );
          await LayoutModel.findByIdAndUpdate(categoryData?._id, {
            categories: categoriesItems,
          });
        }
      }
      res.status(200).json({
        success: true,
        message: "Layout updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

import { Request, Response } from 'express';

import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';

import orphanageView from '../views/orphanages_view';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(orphanageView.render(orphanage));
  },
  
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends,
      opening_hours
    } = request.body;
  
    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];
    
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const orphanage = await orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends,
      opening_hours,
      images
    });
  
    await orphanagesRepository.save(orphanage);
    
    return response.status(201).json(orphanage);
  }
}
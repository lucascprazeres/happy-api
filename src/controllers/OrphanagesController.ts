import { Request, Response } from 'express';

import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanages';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find();

    return response.json(orphanages);
  },

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id);

    return response.json(orphanage);
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
  
    const orphanage = await orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends,
      opening_hours
    });
  
    await orphanagesRepository.save(orphanage);
    
    return response.status(201).json(orphanage);
  }
}
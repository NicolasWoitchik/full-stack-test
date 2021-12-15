import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListBeersService from '../../../services/ListBeersService';

class BeersController {
  public async list(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListBeersService);

    const beers = await service.execute({
      page: req.query.page as unknown as number,
    });

    return res.json(beers);
  }
}

export default BeersController;

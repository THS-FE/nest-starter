import { Test, TestingModule } from '@nestjs/testing';
import { CommController } from './comm.controller';

describe('Comm Controller', () => {
  let controller: CommController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommController],
    }).compile();

    controller = module.get<CommController>(CommController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

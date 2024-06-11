import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDto } from './dto/city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Get()
  findAll() {
    return this.cityService.findAll();
  }

}

import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConsultationsService } from './consultations.service';

@ApiTags('Consultations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('consultations')
export class ConsultationsController {
  constructor(private consultationsService: ConsultationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get user consultations' })
  @ApiResponse({ status: 200, description: 'Consultations retrieved successfully' })
  async getUserConsultations(@Request() req) {
    return this.consultationsService.findByUserId(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get consultation by ID' })
  @ApiResponse({ status: 200, description: 'Consultation retrieved successfully' })
  async getConsultation(@Request() req, @Param('id') id: string) {
    return this.consultationsService.findById(id, req.user.userId);
  }
} 
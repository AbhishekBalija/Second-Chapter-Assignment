import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QuotationsService } from './quotations.service';

@ApiTags('Quotations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('quotations')
export class QuotationsController {
  constructor(private quotationsService: QuotationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get user quotations' })
  @ApiResponse({ status: 200, description: 'Quotations retrieved successfully' })
  async getUserQuotations(@Request() req) {
    return this.quotationsService.findByUserId(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quotation by ID' })
  @ApiResponse({ status: 200, description: 'Quotation retrieved successfully' })
  async getQuotation(@Request() req, @Param('id') id: string) {
    return this.quotationsService.findById(id, req.user.userId);
  }
} 
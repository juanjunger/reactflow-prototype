import { Controller, Post, Get, Body, Param } from '@nestjs/common';

@Controller('workflows')
export class WorkflowsController {
  private workflows = [];

  @Post()
  saveWorkflow(@Body() workflow) {
    const id = this.workflows.length + 1;
    this.workflows.push({ id, ...workflow });
    return { id };
  }

  @Get(':id')
  getWorkflow(@Param('id') id: string) {
    return this.workflows.find((workflow) => workflow.id === parseInt(id));
  }

  @Get()
  getAllWorkflows() {
    return this.workflows;
  }
}

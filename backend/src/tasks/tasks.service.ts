import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        judul: createTaskDto.judul,
        mataKuliah: createTaskDto.mataKuliah,
        deadline: createTaskDto.deadline,
        deskripsi: createTaskDto.deskripsi ?? 'Tidak ada catatan tambahan.',
        isCompleted: createTaskDto.isCompleted ?? false,
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Tugas dengan ID ${id} tidak ditemukan`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async findByDeadline(deadline: string) {
    return this.prisma.task.findMany({
      where: {
        deadline: deadline.toUpperCase(),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSummaryStats() {
    const [total, h1, h3, h7, h14] = await Promise.all([
      this.prisma.task.count(),
      this.prisma.task.count({ where: { deadline: 'H-1' } }),
      this.prisma.task.count({ where: { deadline: 'H-3' } }),
      this.prisma.task.count({ where: { deadline: 'H-7' } }),
      this.prisma.task.count({ where: { deadline: 'H-14' } }),
    ]);

    return {
      total,
      byDeadline: {
        'H-1': h1,
        'H-3': h3,
        'H-7': h7,
        'H-14': h14,
      },
    };
  }
}